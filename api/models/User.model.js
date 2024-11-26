import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 4,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      min: 4,
    },
    password: {
      type: String,
      min: 4,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true, collection: "user-data" }
)

const User = mongoose.model("User", userSchema)
export default User
