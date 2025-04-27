import express from "express"
import {
  register,
  login,
  getProfile,
  logout,
} from "../controllers/auth.controller.js"
import verifyToken from "../middlewares/auth.middleware.js"

const router = express.Router()

// Auth routes
router.post("/register", register)
router.post("/login", login)
router.get("/profile", verifyToken, getProfile)
router.post("/logout", logout)

export default router
