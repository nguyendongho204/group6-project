import express from "express";
import auth from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { forgotPassword, resetPassword, uploadAvatar } from "../controllers/userAdvancedController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);

export default router;
