import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import connectDB from "./Database/connectDB.js"
import User from "./models/User.models.js"
import multer from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Post from "./Models/Post.models.js"

dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000
const salt = bcrypt.genSaltSync(10)
app.use(cors({ credentials: true, origin: process.env.ORIGIN }))
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
  res.send("Hello World!")
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
  const { username, password } = req.body
  const userDoc = await User.findOne({ username })
  if (!userDoc) return res.status(400).json("Wrong Username!")

  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    jwt.sign(
      { username, id: userDoc._id },
      process.env.SECRET_KEY,
      {},
      (err, token) => {
        if (err) throw err
        res.cookie("token", token).json({ id: userDoc._id, username })
      }
    )
  } else {
    return res.status(400).json("Wrong Password!")
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  if (!token) return res.json({ message: "NOT LOGIN" })
  jwt.verify(token, process.env.SECRET_KEY, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
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
    await Post.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
  })
})

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["fullName"])
      .sort({ createdAt: -1 })
      .limit(20)
  )
})

app.get("/post/:id", async (req, res) => {
  const { id } = req.params
  const postDoc = await Post.findById(id).populate("author", ["fullName"])
  res.json(postDoc)
})
