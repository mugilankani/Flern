import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import User from "./models/user.js";
import Course from "./models/course.js";
import authRouter from "./routes/googleAuth.js";

import courseRoutes from "./routes/course.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(authRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
	res.json({ status: "API is running" });
});

// Endpoint to fetch user data
app.get("/api/users", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users" });
	}
});

// Endpoint to fetch course data
app.get("/api/courses", async (req, res) => {
	try {
		const courses = await Course.find();
		res.json(courses);
	} catch (error) {
		res.status(500).json({ message: "Error fetching courses" });
	}
});

app.get("/api/courses/:id", async (req, res) => {
  const id = req.query.id
	try {
		const courses = await Course.findById(id);
		res.json(courses);
	} catch (error) {
		res.status(500).json({ message: "Error fetching courses" });
	}
});

app.use("/api/course", courseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
