import Post from "../models/Post.models.js"
import fs from "fs"

// Create a new post
export const createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" })
  }

  const { title, summary, content } = req.body

  // Input validation
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All post fields are required" })
  }

  try {
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: req.file.path,
      author: req.user.id,
    })

    res.status(201).json(postDoc)
  } catch (err) {
    console.error("Post Creation Error:", err)
    res.status(500).json({ message: "Error creating post", error: err.message })
  }
}

// Update an existing post
export const updatePost = async (req, res) => {
  const { id, title, summary, content } = req.body

  try {
    const postDoc = await Post.findById(id)

    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (JSON.stringify(postDoc.author) !== JSON.stringify(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" })
    }

    const updateData = {
      title,
      summary,
      content,
      cover: req.file ? req.file.path : postDoc.cover,
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    res.json(updatedPost)
  } catch (err) {
    console.error("Post Update Error:", err)
    res.status(500).json({ message: "Error updating post", error: err.message })
  }
}

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    const postDoc = await Post.findById(id)

    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" })
    }

    if (JSON.stringify(postDoc.author) !== JSON.stringify(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" })
    }

    // Optional: Delete cover file
    if (postDoc.cover) {
      try {
        fs.unlinkSync(postDoc.cover)
      } catch (fileErr) {
        console.warn("Could not delete cover file:", fileErr)
      }
    }

    await Post.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
  } catch (err) {
    console.error("Post Deletion Error:", err)
    res.status(500).json({ message: "Error deleting post", error: err.message })
  }
}

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["fullName"])
      .sort({ createdAt: -1 })
      .limit(20) // Optional: limit to 20 most recent posts
    res.json(posts)
  } catch (err) {
    console.error("Fetch Posts Error:", err)
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message })
  }
}

// Get a single post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params

  try {
    const postDoc = await Post.findById(id).populate("author", ["fullName"])

    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.json(postDoc)
  } catch (err) {
    console.error("Fetch Post Error:", err)
    res.status(500).json({ message: "Error fetching post", error: err.message })
  }
}
