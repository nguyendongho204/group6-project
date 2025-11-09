import crypto from "crypto";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import cloudinary from "../config/cloudinaryConfig.js";

// Gửi email reset password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email là bắt buộc" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    // Tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetPasswordExpires = Date.now() + 3600000; // 1 giờ

    // Lưu token vào DB
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu",
      html: `<p>Click vào link bên dưới để đặt lại mật khẩu (hết hạn sau 1 giờ):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email reset mật khẩu đã được gửi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset mật khẩu bằng token
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res.status(400).json({ message: "Token và mật khẩu mới là bắt buộc" });

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    // Hash password mới
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu, xoá token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Vui lòng chọn ảnh để tải lên" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    user.avatar = req.file.path; // multer-storage-cloudinary lưu url vào path
    await user.save();

    res.json({ message: "Cập nhật avatar thành công", avatarUrl: user.avatar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
