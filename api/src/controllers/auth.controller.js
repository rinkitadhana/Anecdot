import User from "../models/User.models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// More secure salt generation
const salt = bcrypt.genSaltSync(10)

// User Registration
export const register = async (req, res) => {
  const { fullName, username, password } = req.body

  // Input validation
  if (!fullName || !username || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" })
    }

    const hashedPassword = bcrypt.hashSync(password, salt)
    const userDoc = await User.create({
      fullName,
      username,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User Created!",
      user: { id: userDoc._id, username: userDoc.username },
    })
  } catch (err) {
    console.error("Registration Error:", err)
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message })
  }
}

// User Login
export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" })
  }

  try {
    const userDoc = await User.findOne({ username })
    if (!userDoc) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const passOk = bcrypt.compareSync(password, userDoc.password)
    if (!passOk) {
      return res.status(400).json({ message: "Invalid username or password" })
    }

    const token = jwt.sign(
      { username, fullName: userDoc.fullName, id: userDoc._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    )

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      })
      .json({ message: "Logged in successfully" })
  } catch (err) {
    console.error("Login Error:", err)
    res.status(500).json({ message: "Internal server error during login" })
  }
}

// Get Profile
export const getProfile = (req, res) => {
  res.json(req.user)
}

// Logout
export const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
    })
    .json({ message: "Logged out successfully" })
}
