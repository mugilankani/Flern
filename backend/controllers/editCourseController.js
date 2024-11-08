import dotenv from "dotenv";
dotenv.config();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash-latest",
  apiKey: process.env.GEMINI_API_KEY, // Make sure to set your API key in environment variables
});


// Create the prompt template
const promptTemplate = PromptTemplate.fromTemplate(
  `You are an expert educational content improver. Given the following text and modification prompt, enhance the content while following these educational guidelines:

Original Text: {text}
Modification Prompt: {prompt}

Please modify the text according to the prompt while following these guidelines. Ensure the modified content:
- Aligns with educational best practices
- Enhances student understanding
- Maintains academic rigor
- Supports active learning
- Preserves important context and connections

Modified text should seamlessly integrate with the surrounding educational material and support the overall learning objectives.

Remember to:
- Consider the prerequisite knowledge needed
- Maintain consistency in terminology
- Support diverse learning styles
- Include opportunities for reflection or application

Return the modified text.

`,
);

// Generate roadmap for a given topic
export async function modifyText(text,prompt) {
  try {
    const modifyPrompt = await promptTemplate.format({ text, prompt });
    const response = await model.invoke(modifyPrompt);
    return response;
  } catch (error) {
    console.error("Error modifying text:", error);
    throw error;
  }
}

// Create a new course in the database based on the roadmap generated
export async function editCourse(text,prompt) {
  try {
    const modifiedText = await modifyText(text,prompt);
    return modifiedText
  } catch (error) {
    console.error("Error editing course:", error);
    throw error;
  }
}
