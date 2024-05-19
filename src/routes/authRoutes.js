const express = require('express');
const authControllers = require('../controllers/authControllers');

const loginRoutes = express.Router();

loginRoutes.post('/api/login', authControllers.login);

module.exports = { loginRoutes };
