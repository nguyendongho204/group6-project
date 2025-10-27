const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa các routes
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);   // Thêm route PUT
router.delete('/users/:id', userController.deleteUser); // Thêm route DELETE

module.exports = router;