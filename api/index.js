import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/index.js"
import { User } from "./models/User.model.js"
import bcrypt from "bcryptjs"

dotenv.config({
  path: "./.env",
})
const app = express()
const salt = bcrypt.genSaltSync(10)
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT | 4000
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log("MongoDB connection error", err)
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
  } catch (e) {
    res.status(400).json(e)
  }
})
