// backend/models/User.js
const mongoose = require('mongoose');

// ✅ Định nghĩa Schema cho User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

// ✅ Tạo và export model User
module.exports = mongoose.model('User', userSchema);
