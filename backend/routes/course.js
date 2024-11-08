import express from "express";
import { createCourse } from "../controllers/courseController.js"; // Import the course creation controller
import Course from "../models/course.js";

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

router.get("/:id", async (req, res) => {
  const { id } = req.params; // Correctly access id from URL params
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    // Call the createCourse function from the controller
    const course = await Course.findById(id); 
    console.log(course);
    res.status(200).json(course);
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).json({ message: "Error finding course" });
  }
});


export default router;
