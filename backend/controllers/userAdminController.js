import User from "../models/User.js";

// Lấy danh sách user (admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật role user (admin)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["User", "Admin"].includes(role))
      return res.status(400).json({ message: "Role không hợp lệ" });

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({ message: "Cập nhật role thành công", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
