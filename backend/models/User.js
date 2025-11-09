import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  },
  avatar: { type: String, default: "" },
resetPasswordToken: String,
resetPasswordExpires: Date,

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

export default User;
