import dotenv from "dotenv";
dotenv.config(); // Load .env ngay đầu

import mongoose from "mongoose";
import app from "./app.js";
import morgan from "morgan";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Kiểm tra giá trị biến môi trường
console.log("🔍 PORT =", PORT);
console.log("🔍 MONGODB_URI =", MONGODB_URI ? "✅ Loaded" : "❌ Missing");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(morgan("dev"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
