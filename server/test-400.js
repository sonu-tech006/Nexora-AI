import "dotenv/config";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function testArticle() {
  try {
    const prompt = "Write an article about React";
    const length = 1200;

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        { 
          role: "system", 
          content: "You are a professional, highly detailed article writer. You MUST strictly follow the user's requested word count. If the user asks for a medium or long article, you must write a comprehensive, deeply detailed article with multiple sections, headings, and extensive paragraphs to meet the length requirement. Do not write short summaries." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: length,
    });
    console.log("Success!");
  } catch (err) {
    console.error("Failed:", err.status, err.response?.data || err.message);
  }
}

testArticle();
