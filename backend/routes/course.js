import express from "express";
import { createCourse } from "../controllers/courseController.js"; // Import the course creation controller
import Course from "../models/course.js";
import { editCourse } from "../controllers/editCourseController";

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

router.post("/id",async (req,res) => {
  const {id} = req.body;
  if(!id){
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    // Call the createCourse function from the controller
    const course  = await Course.findById(id)
    res.status(200).json(course);
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).json({ message: "Error finding course" });
  }
})

router.post("/edit", async (req, res) => {
  const { text, prompt } = req.body; // Expect the text to be passed in the request body
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  

  try {
    await editCourse(text, prompt);
    res.status(201).json({ message: "Course modified successfully" });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ message: "Error editing course" });
  }
});

export default router;
