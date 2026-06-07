import "dotenv/config";
import OpenAI from "openai";

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

async function testResumeReview() {
  try {
    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n` + "This is a dummy resume text. ".repeat(100);

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });
    console.log("Success:", response.choices[0].message.content);
  } catch (err) {
    console.error("Failed:", err.status, err.message, err.response?.data);
  }
}

testResumeReview();
