import express from "express";
import auth from "../middleware/authMiddleware.js";
import checkAdmin from "../middleware/roleMiddleware.js";
import { getAllUsers, deleteUserByAdmin } from "../controllers/userAdminController.js";

const router = express.Router();

// Chỉ admin mới được lấy danh sách user
router.get("/users", auth, checkAdmin, getAllUsers);

// Xóa user: admin hoặc chính user đó được phép xóa
router.delete("/users/:id", auth, deleteUserByAdmin);

export default router;
