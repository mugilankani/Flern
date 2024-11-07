import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId, // Only store the course ID
      ref: "Course", // Reference to the Course model
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
