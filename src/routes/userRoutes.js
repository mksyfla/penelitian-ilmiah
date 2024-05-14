const express = require('express');
const userControllers = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.post('/api/v1/users', userControllers.postUserController);
userRoutes.get('/api/v1/users', userControllers.getUserController);

module.exports = { userRoutes };
