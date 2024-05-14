const express = require('express');
const authControllers = require('../controllers/authControllers');

const loginRoutes = express.Router();

loginRoutes.post('/api/v1/login', authControllers.login);

module.exports = { loginRoutes };
