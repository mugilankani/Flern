import express from "express";
import { createCourse } from "../controllers/courseController.js"; // Import the course creation controller
import Course from "../models/course.js";
import { editCourse } from "../controllers/editCourseController.js";
import { createContent } from "../controllers/contentController.js";

const router = express.Router();

// Define route for creating course
router.post("/create", async (req, res) => {
  const { topic, subject } = req.body; // Expect the topic to be passed in the request body
  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  try {
    // Call the createCourse function from the controller
    const course = await createCourse(topic, subject);
    res.status(201).json({id:course.data._id});
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course" });
  }
});

router.post("/create-topic", async (req, res) => {
  const { topic, subject } = req.body; 
  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  try {
    // Call the createCourse function from the controller
    const content = await createContent(topic, subject);
    res.status(201).json(content);
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ message: "Error creating content" });
  }
});

router.get("/find/:id", async (req, res) => {
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

router.put("/update", async (req,res) => {
  const {id,content} = req.body
  if(!id){
    return res.status(400).json({ message: "Id is required" })
  }
  try {
    const course = await Course.findByIdAndUpdate(id,{content:content},{new:true})
    res.status(200).json(course)
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Error updating course" });
  }
})

router.post('/updatePathContent', async (req, res) => {
  const { courseId, moduleIndex, pathIndex, title, description } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const module = course.modules[moduleIndex];
    if (!module) return res.status(404).json({ error: "Module not found" });

    const path = module.path[pathIndex];
    if (!path) return res.status(404).json({ error: "Path not found" });

    path.metadata.generated = true;
    path.content.push(`Content for ${title}: ${description}`);
    path.metadata.updatedAt = Date.now();

    await course.save();
    res.status(200).json({ message: "Content updated successfully", path });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/edit", async (req, res) => {
  const { text, prompt } = req.body; // Expect the text to be passed in the request body
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const modifiedText = await editCourse(text, prompt);
    res.status(201).send(modifiedText);
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ message: "Error editing course" });
  }
});

export default router;
