const express = require('express');

const {
  postUserController,
  getUsersController,
  getUserProfileController,
  getUserByIdController,
  putUserByIdController,
} = require('../controllers/userControllers');
const { authenticationMiddleware } = require('../middleware/authMiddleware');
const multer = require('../utils/multer');

const userRoutes = express.Router();

userRoutes.post('/api/users', postUserController);

userRoutes.get('/api/users', getUsersController);
userRoutes.get('/api/users/:userId', getUserByIdController);

userRoutes.put('/api/profile', authenticationMiddleware(), multer.single('profile'), putUserByIdController);
userRoutes.get('/api/profile', authenticationMiddleware(), getUserProfileController);

module.exports = { userRoutes };
