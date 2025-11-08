// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Thiếu token xác thực" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");

    req.user = decoded; // lưu userId vào req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

export default auth;
