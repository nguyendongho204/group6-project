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

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // 🔔 CHẾ ĐỘ DEMO: In link ra console (không cần cấu hình email)
    console.log('\n========================================');
    console.log('📧 RESET PASSWORD REQUEST');
    console.log('========================================');
    console.log('Email:', email);
    console.log('Reset URL:', resetUrl);
    console.log('Token expires:', new Date(resetPasswordExpires).toLocaleString('vi-VN'));
    console.log('========================================\n');

    // Gửi email (nếu đã cấu hình)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'your-email@gmail.com') {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Yêu cầu đặt lại mật khẩu",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #667eea;">Đặt Lại Mật Khẩu</h2>
              <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
              <p>Click vào nút bên dưới để đặt lại mật khẩu (link có hiệu lực trong 1 giờ):</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Đặt Lại Mật Khẩu</a>
              </div>
              <p style="color: #666; font-size: 14px;">Hoặc copy link sau vào trình duyệt:</p>
              <p style="color: #667eea; word-break: break-all;">${resetUrl}</p>
              <hr style="border: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email đã được gửi thành công!');
      } catch (emailError) {
        console.error('❌ Lỗi gửi email:', emailError.message);
        console.log('💡 Link reset vẫn hoạt động, vui lòng copy từ console');
      }
    } else {
      console.log('⚠️  Email chưa được cấu hình. Sử dụng link ở trên để reset password.');
    }

    res.json({ 
      message: "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra email hoặc console log.",
      // ⚠️ CHỈ TRẢ VỀ ĐỂ DEMO - XÓA TRONG PRODUCTION
      resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
    });
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

    // Tạo URL cho ảnh local: http://localhost:5001/uploads/avatars/filename.jpg
    const avatarUrl = `${process.env.BACKEND_URL || 'http://localhost:5001'}/uploads/avatars/${req.file.filename}`;
    
    user.avatar = avatarUrl;
    await user.save();

    res.json({ 
      message: "Cập nhật avatar thành công", 
      avatarUrl: user.avatar 
    });
  } catch (err) {
    console.error('Upload avatar error:', err);
    res.status(500).json({ message: err.message });
  }
};
