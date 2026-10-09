import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let cachedConnectionPromise = null

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  if (cachedConnectionPromise) {
    return cachedConnectionPromise
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set")
  }

  try {
    cachedConnectionPromise = mongoose.connect(process.env.MONGODB_URI)
    await cachedConnectionPromise
    console.log("MongoDB is connected!")
    return mongoose.connection
  } catch (error) {
    cachedConnectionPromise = null
    console.log("MONGODB connection error ", error)
    throw error
  }
}

// Close the connection so no heartbeat traffic keeps the Railway service awake
export const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) return
  cachedConnectionPromise = null
  await mongoose.disconnect()
  console.log("MongoDB disconnected (idle)")
}

export default connectDB
