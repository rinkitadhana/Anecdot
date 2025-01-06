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

dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000
const salt = bcrypt.genSaltSync(10)
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
)
app.use(express.json())
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))
const uploadMiddleware = multer({ dest: "uploads/" })

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    })
  )
  .catch((err) => {
    console.log("MongoDB Error :", err)
  })

app.get("/", (req, res) => {
  res.send("Hello China!")
})

app.post("/register", async (req, res) => {
  const { fullName, username, password } = req.body
  try {
    const userDoc = await User.create({
      fullName,
      username,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc)
  } catch (err) {
    res.status(400).json(err)
  }
})

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json("Username and password are required")
    }

    const userDoc = await User.findOne({ username })
    if (!userDoc) return res.status(400).json("Wrong Username!")

    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { username, fullName: userDoc.fullName, id: userDoc._id },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          if (err) {
            console.error("JWT Sign Error:", err)
            return res.status(500).json("Error creating login token")
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              maxAge: 24 * 60 * 60 * 1000,
            })
            .json("Logged in Successfully")
        }
      )
    } else {
      return res.status(400).json("Wrong Password!")
    }
  } catch (err) {
    console.error("Login Error:", err)
    res.status(500).json("Internal server error during login")
  }
})

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "NOT LOGIN" })

    jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
      if (err) {
        console.error("Token Verification Error:", err)
        return res.status(401).json({ message: "Invalid token" })
      }
      res.json(info)
    })
  } catch (err) {
    console.error("Profile Error:", err)
    res.status(500).json({ message: "Error checking profile" })
  }
})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "OK" })
})

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = path + "." + ext
  fs.renameSync(path, newPath)

  const { token } = req.cookies
  if (!token) return res.json({ message: "NOT LOGIN" })
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err
    const { title, summary, content } = req.body
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    })
    res.json(postDoc)
  })
})
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length - 1]
    newPath = path + "." + ext
    fs.renameSync(path, newPath)
  }
  const { token } = req.cookies
  if (!token) return res.json({ message: "NOT LOGIN" })
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err
    const { id, title, summary, content } = req.body

    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

    if (!isAuthor) {
      return res.status(400).json("You are not the author")
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      },
      { new: true }
    )
    res.json(updatedPost)
  })
})

app.delete("/post/:id", async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.json({ message: "NOT LOGIN" })
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
    if (err) throw err
    const { id } = req.params
    const postDoc = await Post.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

    if (!isAuthor) {
      return res.status(400).json("You are not the author")
    }
    if (postDoc.cover) {
      const path = postDoc.cover.split("/").pop()
      const fullPath = path.join(__dirname, "..", "uploads", path)
      fs.unlinkSync(fullPath)
    }
    await Post.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
  })
})

app.get("/post", async (req, res) => {
  res.json(
    await Post.find().populate("author", ["fullName"]).sort({ createdAt: -1 })
    // .limit(20)
  )
})

app.get("/post/:id", async (req, res) => {
  const { id } = req.params
  const postDoc = await Post.findById(id).populate("author", ["fullName"])
  res.json(postDoc)
})
