import User from "../models/User.js";

// Lấy danh sách tất cả user (chỉ admin được quyền)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ẩn password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa user theo id (admin hoặc chính user đó có thể xóa)
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra user đang đăng nhập
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: "Người dùng không tồn tại" });

    // Chỉ admin hoặc chính user đó mới được xóa
    if (currentUser.role !== "Admin" && currentUser._id.toString() !== id) {
      return res.status(403).json({ message: "Bạn không có quyền xóa tài khoản này" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "Không tìm thấy người dùng để xóa" });

    res.json({ message: "Đã xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
