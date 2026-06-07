import "dotenv/config";
import { generateImage } from "./controllers/aiController.js";
import connectCloudinary from "./configs/cloudinary.js";

async function testGenerateImage() {
  await connectCloudinary();

  const req = {
    auth: () => ({ userId: "user_test_123" }),
    body: { prompt: "a white cat playing with a boy" },
    plan: "premium"
  };

  const res = {
    json: (data) => {
      console.log("Response:", data);
    }
  };

  await generateImage(req, res);
}

testGenerateImage();
