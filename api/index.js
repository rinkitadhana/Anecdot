import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./database/index.js"
import { User } from "./models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

dotenv.config({
  path: "./.env",
})
const app = express()
const salt = bcrypt.genSaltSync(10)
const secret = "RinkitAdhanaIsGay!"
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT | 4000
connectDB()

app.post("/register", async (req, res) => {
  const { email, username, password } = req.body
  try {
    const userDoc = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const userDoc = await User.findOne({ username })
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({ id: userDoc._id, username })
    })
  } else {
    res.status(400).json("Wrong credentials!")
  }
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ message: "OK" })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
