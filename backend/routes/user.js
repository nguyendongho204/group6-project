const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);   // GET /users
router.post('/users', userController.createUser); // POST /users

module.exports = router;
