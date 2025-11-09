import express from "express";
import auth from "../middleware/authMiddleware.js";
import checkAdmin from "../middleware/roleMiddleware.js";
import { getAllUsers, updateUserRole } from "../controllers/userAdminController.js";

const router = express.Router();

// Chỉ admin mới lấy được danh sách user
router.get("/users", auth, checkAdmin, getAllUsers);

// Cập nhật role user (chỉ admin)
router.put("/users/:id/role", auth, checkAdmin, updateUserRole);

export default router;
