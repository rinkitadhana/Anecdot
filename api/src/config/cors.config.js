import dotenv from "dotenv"

dotenv.config()

// Improved CORS configuration
const corsOptions = {
  credentials: true,
  origin: process.env.ORIGIN || "http://localhost:3000", // Fallback origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
}

export default corsOptions
