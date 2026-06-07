import "dotenv/config";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
  maxRetries: 3,
});

async function testOpenAIGemini() {
  try {
    const response = await AI.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [{ role: "user", content: "Write a 10 word story." }],
      temperature: 0.7,
      max_tokens: 50,
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (err) {
    console.error("Failed:", err.status, err.message, err.response?.data);
  }
}

testOpenAIGemini();
