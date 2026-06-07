import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import FormData from "form-data";
import OpenAI from "openai";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // The user put the Gemini key here
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  maxRetries: 3,
});

// ✅ Generate Article
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const prompt = req.body.prompt;
    const length = parseInt(req.body.length) || 1200;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

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

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    let errorMessage = error.response?.data?.error?.message || error.response?.data || error.message;
    if (typeof errorMessage === 'string' && errorMessage.includes('429')) {
      errorMessage = 'API Rate Limit Exceeded. Please wait a few seconds and try again.';
    } else if (typeof errorMessage === 'string' && errorMessage.includes('400')) {
      errorMessage = 'Bad Request: Please check the values provided for article generation.';
    } else if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message || "An error occurred.";
    }
    console.log(errorMessage);
    res.json({ success: false, message: errorMessage });
  }
};

// ✅ Generate Blog Title
export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    res.json({ success: true, content });
  } catch (error) {
    let errorMessage = error.response?.data?.error?.message || error.response?.data || error.message;
    if (typeof errorMessage === 'string' && errorMessage.includes('429')) {
      errorMessage = 'API Rate Limit Exceeded. Please wait a few seconds and try again.';
    } else if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message || "An error occurred.";
    }
    console.log(errorMessage);
    res.json({ success: false, message: errorMessage });
  }
};

// ✅ Generate Image
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "Only for premium users",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Full error in generateImage:", error.response?.status, error.message);
    let errorMessage = error.response?.data?.error?.message || error.response?.data || error.message;
    
    // Decode ArrayBuffer from Clipdrop into readable string
    if (errorMessage instanceof ArrayBuffer || Buffer.isBuffer(errorMessage)) {
        try {
            const decoded = Buffer.from(errorMessage).toString('utf-8');
            const parsed = JSON.parse(decoded);
            errorMessage = parsed.error || parsed.message || decoded;
        } catch(e) {
            errorMessage = Buffer.from(errorMessage).toString('utf-8');
        }
    }
    
    if (typeof errorMessage === 'string' && errorMessage.includes('429')) {
      errorMessage = 'API Rate Limit Exceeded. Please wait a few seconds and try again.';
    } else if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message || "An error occurred.";
    }
    console.log("Final resolved error message:", errorMessage);
    res.json({ success: false, message: errorMessage });
  }
};

// ✅ Resume Review
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        succes: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review') `;

    res.json({ success: true, content });
  } catch (error) {
    let errorMessage = error.response?.data?.error?.message || error.response?.data || error.message;
    if (typeof errorMessage === 'string' && errorMessage.includes('429')) {
      errorMessage = 'API Rate Limit Exceeded. You have hit the Free Tier limit of 15 requests per minute. Please wait 60 seconds and try again.';
    } else if (typeof errorMessage === 'object') {
      errorMessage = errorMessage.message || "An error occurred.";
    }
    console.log(errorMessage);
    res.json({ success: false, message: errorMessage });
  }
};

// ✅ Remove Image Background
export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        succes: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image') `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// ✅ Remove Image Object
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        succes: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};