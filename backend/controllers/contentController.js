import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
console.log(process.env.GOOGLE_API_KEY);  // Check if the API key is loaded

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash-latest",
    apiKey: process.env.GEMINI_API_KEY, // Make sure to set your API key in environment variables
  });
  

// Create an output parser for JSON structure
const parser = new JsonOutputParser();

// Create the prompt template

const promptTemplate = PromptTemplate.fromTemplate(
    `Create content for the topic, {topic} which is part of the course,{course} based on the below instructions:
    Course Content Generation Prompt Framework
Base Structure
Please create a comprehensive course lesson following this specific structure:

Start with a friendly, engaging introduction that:

Welcomes the learner personally
States the topic clearly
Explains why this topic matters
Lists 3-4 concrete learning objectives
Uses conversational, encouraging tone


Core Content Requirements:

Break down complex concepts using simple analogies
Include real-world examples that learners can relate to
Use tables, code snippets, or diagrams where relevant
Explain technical terms in plain language
Add "Think of it like..." comparisons for difficult concepts
Include practical examples after each concept
Use a mix of theory and hands-on examples


Format Specifications:

Use clear headings and subheadings
Include visual breaks between sections
Format code examples in proper syntax highlighting
Use bullet points and numbered lists for better readability
Include tables where appropriate for comparing concepts
Add "Important Points" boxes for key takeaways


Teaching Style:

Use a conversational, friendly tone throughout
Write as if explaining to a friend
Include phrases like "Let's dive in," "Think about it this way," "Imagine..."
Add encouraging comments like "You're doing great!" or "Don't worry if this seems complex at first"
Use questions to engage learners
Include common misconceptions and how to avoid them


Examples and Practice:

Start with basic examples
Progress to more complex scenarios
Include multiple examples for each concept
Provide practical, real-world applications
Add "Try it yourself" sections
Include sample problems with solutions


Section Organization:

Introduction (warm welcome, objectives)
Core Concepts (with analogies)
Detailed Explanations
Examples and Use Cases need for every topic
Common Pitfalls and Solutions
Practice Opportunities
Summary and Next Steps

Additional Elements:

Include "Pro Tips" throughout
Add "Remember" boxes for important points
Include troubleshooting guides where relevant
Link to additional resources
Add quick reference summaries



Prompt Template
Please use this template when requesting course content:

Please maintain a friendly, conversational tone throughout, as if teaching a friend. Include plenty of real-world examples and practical applications. Break down complex concepts using simple analogies and step-by-step explanations.

Additional Requirements:
- Use engaging, conversational language
- Include multiple examples for each concept
- Provide practical exercises
- Add troubleshooting tips
- Include common mistakes to avoid
- End with a summary and next steps
Example Usage
CopyCreate a detailed lesson on "Introduction to Data Types in Python" following these specifications:

1. Audience Level: Beginner
2. Prerequisite Knowledge: Basic computer usage
3. Primary Learning Objectives:
  - Understand different Python data types
  - Learn when to use each data type
  - Master basic data type conversion
4. Required Examples: 
  - String manipulation
  - Number operations
  - Boolean logic
5. Practical Applications:
  - Data collection
  - Simple calculations
  - User input handling
6. Special Focus Areas:
  - Type conversion
  - Common type errors
7. Interactive Elements:
  - Practice exercises for each data type
  - Debug challenges
8. Visual Elements:
  - Data type comparison table
  - Type conversion flowchart`
);

async function generateContent(topic,course) {
    try {
        // Generate the full prompt
        const prompt = await promptTemplate.format({ "topic":topic, "course":course });
        
        // Get response from Gemini
        const response = await model.invoke(prompt);

        console.log(response)
        
        return response.content;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}

// Example usage
export async function createContent(topic,course) {
    try {
        const content = await generateContent(topic,course);
        console.log(content);
        return content
    } catch (error) {
        console.error("Main error:", error);
        throw error; 
    }
}

