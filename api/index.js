import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./database/index.js"
import { User } from "./models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config({
  path: "./.env",
})
const app = express()
const salt = bcrypt.genSaltSync(10)
const secret = "RinkitAdhanaIsGay!"
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())

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
  console.log("bhello")

  const { username, password } = req.body
  const userDoc = await User.findOne({ username })
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if (passOk) {
    console.log("hello")
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({ message: "OK" })
    })
  } else {
    res.status(400).json("Wrong credentials!")
  }
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
