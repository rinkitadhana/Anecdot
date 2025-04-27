import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"
import connectDB from "./Database/connectDB.js"
import getDirname from "./utils/path.utils.js"
import corsOptions from "./config/cors.config.js"

// Routes
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

// Load environment variables
dotenv.config({ path: "../.env" })

const app = express()
const PORT = process.env.PORT || 4000

// Get __dirname equivalent in ESM
const __dirname = getDirname(import.meta.url)

// Middleware setup
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!")
})

// Route middleware - maintain original URL structure
app.use("/", authRoutes)
app.use("/post", postRoutes)

// Database connection with error handling
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("Server startup error:", err)
    process.exit(1)
  }
}

startServer()

export default app
