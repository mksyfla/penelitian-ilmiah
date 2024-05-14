const express = require('express');
const userControllers = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.post('/api/v1/users', userControllers.postUser);
userRoutes.get('/api/v1/users', userControllers.getUsers);

const loginRoutes = express.Router();

loginRoutes.post('/api/v1/login', userControllers.login);

module.exports = { userRoutes, loginRoutes };
