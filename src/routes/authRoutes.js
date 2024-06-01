const express = require('express');
const { loginController } = require('../controllers/authControllers');

const loginRoutes = express.Router();

loginRoutes.post('/api/login', loginController);

module.exports = { loginRoutes };
