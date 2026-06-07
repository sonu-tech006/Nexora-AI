import "dotenv/config";
import axios from "axios";

async function testKey() {
  const key = process.env.OPENAI_API_KEY;
  console.log("Testing key:", key.slice(0, 5) + "...");
  
  // Test Google AI Studio
  try {
    const res = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    console.log("Success with Google AI Studio. Models:", res.data.models.map(m => m.name).slice(0, 3));
    return;
  } catch (e) {
    console.log("Failed Google AI Studio:", e.response?.status, e.response?.data);
  }
}

testKey();
