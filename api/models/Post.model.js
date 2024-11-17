import mongoose, { Schema } from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)
export default Post
