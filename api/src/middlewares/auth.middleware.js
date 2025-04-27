import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Middleware for token verification
const verifyToken = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}

export default verifyToken
