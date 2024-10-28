import express from "express"
import cors from "cors"

const app = express()
import dotenv from "dotenv"
app.use(cors())
app.use(express.json())

dotenv.config({
  path: "./.env",
})
const PORT = process.env.PORT | 4000

app.post("/register", (req, res) => {
  const { email, username, password } = req.body
  res.json({ requestData: { username, password } })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
