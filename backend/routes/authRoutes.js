// routes/authRoutes.js
import express from "express";
import { signup, login, logout } from "../controllers/userController.js";

const router = express.Router();

// 3 API chính của hoạt động 1
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
