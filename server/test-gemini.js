import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const testGemini = async () => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Testing with API Key:", apiKey.slice(0, 10) + "...");
        const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{ parts: [{ text: "Write a 10 word story." }] }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 50
                }
            }
        );
        console.log("Success! Response:");
        console.log(data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("Native Error Response Status:", error.response?.status);
        console.error("Native Error Response Data:", JSON.stringify(error.response?.data, null, 2));
    }
};

testGemini();
