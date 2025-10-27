const User = require('../models/User');

// GET /users
exports.getUsers = async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);               // sẽ có _id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Missing name or email' });

    const user = await User.create({ name, email });
    res.status(201).json(user);    // _id tự sinh bởi MongoDB
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,              // lưu ý: đây là _id của Mongo
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
