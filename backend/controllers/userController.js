// Import User model nếu đang sử dụng MongoDB
const User = require('../models/User');

// Nếu chưa dùng MongoDB, sử dụng mảng tạm
let users = [];

// GET: Lấy danh sách users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Tạo user mới
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT: Cập nhật user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Xóa user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Không tìm thấy user" });
        }
        res.json({ message: "Đã xóa user thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};