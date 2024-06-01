const express = require('express');

const {
  postUserController,
  getUsersController,
  getUserProfileController,
  getUserByIdController,
  putUserByIdController,
} = require('../controllers/userControllers');
const { authenticationMiddleware } = require('../middleware/authMiddleware');

const userRoutes = express.Router();

userRoutes.post('/api/users', postUserController);
userRoutes.get('/api/users', getUsersController);
userRoutes.get('/api/users/:userId', getUserByIdController);

userRoutes.put('/api/profile', authenticationMiddleware(), putUserByIdController);
userRoutes.get('/api/profile', authenticationMiddleware(), getUserProfileController);

module.exports = { userRoutes };
