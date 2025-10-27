const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb+srv://NguyenThanhVu:dongho123@cluster0.tqdrv7b.mongodb.net/groupDB?retryWrites=true&w=majority'
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Route kiểm tra server hoạt động
app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running' });
});

// ✅ Mount route user
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
