const express = require('express');
const { postUserController, getUserController } = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.post('/api/v1/users', postUserController);
userRoutes.get('/api/v1/users', getUserController);

module.exports = { userRoutes };
