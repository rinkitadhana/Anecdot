import express from "express"
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/post.controller.js"
import verifyToken from "../middlewares/auth.middleware.js"
import uploadMiddleware from "../middlewares/upload.middleware.js"

const router = express.Router()

// Post routes
router.post("/", verifyToken, uploadMiddleware.single("file"), createPost)
router.put("/", verifyToken, uploadMiddleware.single("file"), updatePost)
router.delete("/:id", verifyToken, deletePost)
router.get("/", getAllPosts)
router.get("/:id", getPostById)

export default router
