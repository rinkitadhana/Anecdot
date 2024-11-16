import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import connectDB from "./database/index.js"
import User from "./models/User.model.js"
import multer from "multer"

dotenv.config({ path: "./.env" })

const app = express()
const PORT = process.env.PORT | 4000
const salt = bcrypt.genSaltSync(10)
const secret = "RinkitAdhanaIsGay!"
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())
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

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body
  try {
    const userDoc = await User.create({
      email,
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
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({ id: userDoc._id, username })
    })
  } else {
    return res.status(400).json("Wrong Password!")
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  if (!token) return res.json({ message: "NOT LOGIN" })
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "OK" })
})
