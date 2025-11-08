// app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://NguyenThanhVu:dongho123@cluster0.tqdrv7b.mongodb.net/groupDB?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get("/", (_req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Thay đổi port từ 3001 sang port khác, ví dụ 3002
const port = 3002;
app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});

export default app;