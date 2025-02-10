import express from "express"
import User from "./models/User.models.js"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import connectDB from "./Database/connectDB.js"
import multer from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Post from "./models/Post.models.js"

// Load environment variables
dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000

// More secure salt generation
const salt = bcrypt.genSaltSync(10)

// Improved CORS configuration
const corsOptions = {
  credentials: true,
  origin: process.env.ORIGIN || "http://localhost:3000", // Fallback origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
}

// Middleware setup
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// File path handling
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
})

// Database connection with error handling
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("Server startup error:", err)
    process.exit(1)
  }
}

startServer()

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!")
})

// User Registration
app.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body

  // Input validation
  if (!fullName || !username || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" })
    }

    const hashedPassword = bcrypt.hashSync(password, salt)
    const userDoc = await User.create({
      fullName,
      username,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User Created!",
      user: { id: userDoc._id, username: userDoc.username },
    })
  } catch (err) {
    console.error("Registration Error:", err)
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message })
  }
})

// User Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" })
  }

  try {
    const userDoc = await User.findOne({ username })
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (!passOk) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign(
      { username, fullName: userDoc.fullName, id: userDoc._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    )

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })
      .json({ message: "Logged in successfully" })
  } catch (err) {
    console.error("Login Error:", err)
    res.status(500).json({ message: "Internal server error during login" })
  }
})

// Profile Route (with token verification)
app.get("/profile", verifyToken, (req, res) => {
  res.json(req.user)
})

// Logout Route
app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    })
    .json({ message: "Logged out successfully" })
})

// Create Post (with token verification)
app.post(
  "/post",
  verifyToken,
  uploadMiddleware.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" })
    }

    const { title, summary, content } = req.body

    // Input validation
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All post fields are required" })
    }

    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: req.file.path,
        author: req.user.id,
      })

      res.status(201).json(postDoc)
    } catch (err) {
      console.error("Post Creation Error:", err)
      res
        .status(500)
        .json({ message: "Error creating post", error: err.message })
    }
  }
)

// Update Post (with token verification and author check)
app.put(
  "/post",
  verifyToken,
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { id, title, summary, content } = req.body

    try {
      const postDoc = await Post.findById(id)

      if (!postDoc) {
        return res.status(404).json({ message: "Post not found" })
      }

      if (JSON.stringify(postDoc.author) !== JSON.stringify(req.user.id)) {
        return res
          .status(403)
          .json({ message: "Not authorized to edit this post" })
      }

      const updateData = {
        title,
        summary,
        content,
        cover: req.file ? req.file.path : postDoc.cover,
      }

      const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
      })
      res.json(updatedPost)
    } catch (err) {
      console.error("Post Update Error:", err)
      res
        .status(500)
        .json({ message: "Error updating post", error: err.message })
    }
  }
)

// Delete Post (with token verification and author check)
app.delete("/post/:id", verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const postDoc = await Post.findById(id)

    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (JSON.stringify(postDoc.author) !== JSON.stringify(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" })
    }

    // Optional: Delete cover file
    if (postDoc.cover) {
      try {
        fs.unlinkSync(postDoc.cover)
      } catch (fileErr) {
        console.warn("Could not delete cover file:", fileErr)
      }
    }

    await Post.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
  } catch (err) {
    console.error("Post Deletion Error:", err)
    res.status(500).json({ message: "Error deleting post", error: err.message })
  }
})

// Get All Posts
app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["fullName"])
      .sort({ createdAt: -1 })
      .limit(20) // Optional: limit to 20 most recent posts
    res.json(posts)
  } catch (err) {
    console.error("Fetch Posts Error:", err)
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message })
  }
})

// Get Single Post
app.get("/post/:id", async (req, res) => {
  const { id } = req.params

  try {
    const postDoc = await Post.findById(id).populate("author", ["fullName"])

    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json(postDoc)
  } catch (err) {
    console.error("Fetch Post Error:", err)
    res.status(500).json({ message: "Error fetching post", error: err.message })
  }
})

export default app
