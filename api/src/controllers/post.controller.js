import Post from "../models/Post.models.js"
import { v2 as cloudinary } from "cloudinary"

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, summary, content } = req.body
    const file = req.files?.file

    if (!title || !summary || !content || !file) {
      return res.status(400).json({ message: "All post fields are required" })
    }

    // Base64 encode the file
    const fileStr = `data:${file.mimetype};base64,${file.data.toString(
      "base64"
    )}`

    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "anecdote/posts",
      resource_type: "image",
    })

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: uploadedResponse.secure_url,
      author: req.user.id,
    })

    res.status(201).json(postDoc)
  } catch (err) {
    console.error("Post Creation Error:", err)
    res.status(500).json({ message: "Error creating post", error: err.message })
  }
}

export const updatePost = async (req, res) => {
  const { id, title, summary, content } = req.body
  const file = req.files?.file

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
      cover: postDoc.cover,
    }

    if (file) {
      // Delete the old image from Cloudinary if it exists
      if (postDoc.cover) {
        const imageId = postDoc.cover.split("/").pop()?.split(".")[0]
        if (imageId) {
          try {
            await cloudinary.uploader.destroy(`anecdote/posts/${imageId}`, {
              resource_type: "image",
              invalidate: true,
            })
          } catch (error) {
            console.error("Error deleting old image:", error)
          }
        }
      }

      // Base64 encode the file
      const fileStr = `data:${file.mimetype};base64,${file.data.toString(
        "base64"
      )}`

      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        folder: "anecdote/posts",
        resource_type: "image",
        invalidate: true,
      })

      updateData.cover = uploadedResponse.secure_url
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

    if (postDoc.cover) {
      const imageId = postDoc.cover.split("/").pop()?.split(".")[0]
      if (imageId) {
        await cloudinary.uploader.destroy(`anecdote/posts/${imageId}`, {
          resource_type: "image",
        })
      }
    }

    await Post.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
  } catch (err) {
    console.error("Post Deletion Error:", err)
    res.status(500).json({ message: "Error deleting post", error: err.message })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["fullName"])
      .sort({ createdAt: -1 })
      .limit(20)
    res.json(posts)
  } catch (err) {
    console.error("Fetch Posts Error:", err)
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message })
  }
}

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
