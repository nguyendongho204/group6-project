import express from "express";
import {
  signup,
  login,
  logout,
  getUserInfo,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// === HOẠT ĐỘNG 1 ===
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// === HOẠT ĐỘNG 2 ===
router.get("/me", auth, getUserInfo);       // Lấy thông tin user hiện tại
router.put("/users/:id", auth, updateUser); // Cập nhật thông tin user
router.delete("/users/:id", auth, deleteUser); // Xóa user

export default router;
