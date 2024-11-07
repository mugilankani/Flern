import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import Course from "../models/course.js"; // Assuming Course model is in models/course.js

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash-latest",
  apiKey: process.env.GEMINI_API_KEY, // Make sure to set your API key in environment variables
});

// Create an output parser for JSON structure
const parser = new JsonOutputParser();

// Create the prompt template
const promptTemplate = PromptTemplate.fromTemplate(
  `Create a Roadmap for the {topic} from the subject {subject}
Identify the Main Modules:
Determine the key areas or modules that are essential for mastering your topic. Each module should represent a significant component of the subject.
Define Subtopics for Each Module:
For each module, list the essential subtopics that learners should explore. These should be concise and relevant to the module's focus.
Include Tools, Frameworks, or Languages:
If applicable, specify any tools, frameworks, or languages associated with each module. This can be included as part of the module or as a separate section.
Visited Websites:
List any websites you visited during your research for this topic. This will provide additional resources for learners to explore.
The response should be a JSON object with the following structure:

{{
    "title": "course name",
    "modules": [
        {{
            "title": "module title",
            "path": [
                {{
                    "title": "unit name",
                    "description": "description for the unit",
                }}
            ]
        }}
    ]
}}

Format the response as a valid JSON object.`,
);

// Generate roadmap for a given topic
export async function generateRoadmap(topic) {
  try {
    const prompt = await promptTemplate.format({ topic });
    const response = await model.invoke(prompt);
    const roadmap = await parser.parse(response.content);
    return roadmap;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
}

// Create a new course in the database based on the roadmap generated
export async function createCourse(topic) {
  try {
    const roadmap = await generateRoadmap(topic);

    // Create a new course document from the roadmap data
    const newCourse = new Course({
      title: roadmap.title,
      modules: roadmap.modules,
    });

    // Save the course to the database
    await newCourse.save();

    console.log("Course created and saved to the database:", newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
