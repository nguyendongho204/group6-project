import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🟢 Đăng ký
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã được sử dụng" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟠 Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Sai mật khẩu" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      user: { _id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔴 Đăng xuất
export const logout = (req, res) => {
  res.json({ message: "Đăng xuất thành công" });
};

// 🟣 Lấy thông tin người dùng hiện tại
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟡 Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData = { name, email };
    
    // Nếu có mật khẩu mới, hash và cập nhật
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser)
return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });

    res.json({ success: true, message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔴 Xóa người dùng
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({ message: "Đã xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};