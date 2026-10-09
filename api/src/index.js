import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import connectDB, { disconnectDB } from "./Database/connectDB.js"
import corsOptions from "./config/cors.config.js"

// Roues
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

import { v2 as cloudinary } from "cloudinary"

dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000
const DB_IDLE_TIMEOUT_MS = 5 * 60 * 1000

let idleTimer = null
const scheduleDisconnect = () => {
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    disconnectDB().catch((error) => console.error("Database disconnect error:", error))
  }, DB_IDLE_TIMEOUT_MS)
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!")
})

// Connect lazily per request and drop the connection when idle so the service can sleep
app.use(async (req, res, next) => {
  scheduleDisconnect()
  try {
    await connectDB()
    next()
  } catch (error) {
    console.error("Database init error:", error)
    res.status(503).json({ message: "Database unavailable" })
  }
})

app.use("/", authRoutes)
app.use("/post", postRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
