const express = require('express');
const app = express();

app.use(express.json()); // Cho phép đọc JSON từ body

const userRoutes = require('./routes/user');
app.use('/', userRoutes);


app.get('/', (req, res) => {  // Route test
  res.json({ message: 'Backend is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
