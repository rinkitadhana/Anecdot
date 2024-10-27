import express from "express"

const app = express()
import dotenv from "dotenv"

dotenv.config({
  path: "./.env",
})
const PORT = process.env.PORT | 4000

app.post("/register", (req, res) => {
  res.send("Hello!!")
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
