import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinary() {
  try {
    // Generate a tiny transparent 1x1 png base64 for testing
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    console.log("Cloudinary success, url:", secure_url);
  } catch (error) {
    console.error("Cloudinary error:", error);
  }
}

testCloudinary();
