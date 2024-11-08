import mongoose from "mongoose";

// Path Schema
const PathSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["learn", "quiz", "feedback"],
    default: "learn",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Array of content URLs or data
    default: "",
  },
  metadata: {
    generated: {
      type: Boolean,
      default: false, // Indicates whether the path is generated or not
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for when the path was created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Timestamp for when the path was last updated
    },
  },
});

// Module Schema
const ModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: [PathSchema], // An array of PathSchema objects
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt for ModuleSchema
);

// Course Schema
const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    modules: [ModuleSchema], // An array of ModuleSchema objects
    progress: {
      type: Number, // Track progress as a percentage (0-100)
      default: 0,
    },
  },
  { timestamps: true }, // Automatically manage createdAt and updatedAt for CourseSchema
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
