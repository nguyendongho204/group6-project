// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import model User

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB Atlas
mongoose.connect('mongodb+srv://NguyenThanhVu:dongho123@cluster0.tqdrv7b.mongodb.net/groupDB?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Route kiểm tra backend hoạt động
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// ✅ Lấy danh sách người dùng từ MongoDB
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('❌ Lỗi khi lấy danh sách người dùng:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Thêm người dùng mới vào MongoDB
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Thiếu thông tin người dùng!' });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    console.log('✅ Đã lưu người dùng vào MongoDB:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Lỗi khi thêm người dùng:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Khởi động server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));