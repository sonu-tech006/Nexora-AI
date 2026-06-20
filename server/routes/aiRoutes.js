import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article", auth, generateArticle);
aiRouter.post("/generate-blog-title", auth, generateBlogTitle);
aiRouter.post("/generate-image", auth, generateImage);

aiRouter.post(
  "/remove-image-background",
  upload.single("image"),
  auth,
  removeImageBackground
);
aiRouter.post(
  "/remove-image-object",
  upload.single("image"),
  auth,
  removeImageObject
);
aiRouter.post("/resume-review", upload.single("resume"), auth, resumeReview);

aiRouter.post("/test-generate-image", async (req, res) => {
  req.auth = { userId: "test_user_id" };
  req.plan = "premium";
  await generateImage(req, res);
});

export default aiRouter;
