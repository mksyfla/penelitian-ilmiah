const express = require('express');

const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/api/users', userControllers.postUser);
userRoutes.get('/api/users', userControllers.getUsers);
userRoutes.get('/api/users/:userId', userControllers.getUserById);

userRoutes.put('/api/profile', authMiddleware.authenticationMiddleware(), userControllers.putUserById);
userRoutes.get('/api/profile', authMiddleware.authenticationMiddleware(), userControllers.getUserProfile);

module.exports = { userRoutes };
