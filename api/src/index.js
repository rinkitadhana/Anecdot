import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import connectDB from "./Database/connectDB.js"
import getDirname from "./utils/path.utils.js"
import corsOptions from "./config/cors.config.js"

// Roues
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

import { v2 as cloudinary } from "cloudinary"

dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000

const __dirname = getDirname(import.meta.url)

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  })
)

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    console.error("Database connection failed:", error)
    res.status(500).json({ error: "Database connection failed" })
  }
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!")
})

app.use("/", authRoutes)
app.use("/post", postRoutes)

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app
