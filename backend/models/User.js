// backend/models/User.js
import mongoose from "mongoose";

// ✅ Định nghĩa Schema cho User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ Tạo model
const User = mongoose.model("User", userSchema);

// ✅ Export mặc định
export default User;
