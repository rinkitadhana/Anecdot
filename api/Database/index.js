import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://therinkit:Rinkit123@anecdot.wnazl.mongodb.net/?retryWrites=true&w=majority&appName=Anecdot"
    )
    console.log("MongoDB is connected")
  } catch (error) {
    console.log("MONGODB connection error ", error)
    process.exit(1)
  }
}

export default connectDB
