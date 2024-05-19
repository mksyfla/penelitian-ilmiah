const express = require('express');

const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/api/v1/users', userControllers.postUser);
userRoutes.get('/api/v1/users', userControllers.getUsers);
userRoutes.get('/api/v1/users/:userId', userControllers.getUserById);

userRoutes.put('/api/v1/profile', authMiddleware.authenticationMiddleware(), userControllers.putUserById);
userRoutes.get('/api/v1/profile', authMiddleware.authenticationMiddleware(), userControllers.getUserProfile);

module.exports = { userRoutes };
