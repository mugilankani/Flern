import express from "express";
import { createCourse } from "../controllers/courseController.js"; // Import the course creation controller

const router = express.Router();

// Define route for creating course
router.post("/create", async (req, res) => {
  const { topic, subject } = req.body; // Expect the topic to be passed in the request body
  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  try {
    // Call the createCourse function from the controller
    await createCourse(topic, subject);
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course" });
  }
});

export default router;
