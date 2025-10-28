// Mảng tạm (chưa dùng DB)
let users = [{ id: 1, name: "Alice", email: "alice@example.com" }];

// GET /users
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST /users
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Thiếu name hoặc email" });

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};
