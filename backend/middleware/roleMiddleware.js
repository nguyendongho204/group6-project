import User from "../models/User.js";

const checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Bạn cần đăng nhập" });
  }

  User.findById(req.user.id)
    .then(user => {
      if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
      if (user.role !== "Admin") {
        return res.status(403).json({ message: "Bạn không có quyền truy cập" });
      }
      next();
    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
};

export default checkAdmin;
