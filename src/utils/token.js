const jwt = require('jsonwebtoken');

function generateAccessToken({ id, email, category }) {
  return jwt.sign({ id, email, category }, 'secretkey', { expiresIn: '1h' });
}

function generateRefreshToken({ id, email, category }) {
  return jwt.sign({ id, email, category }, 'secretkey', { expiresIn: '1d' });
}

module.exports = { generateAccessToken, generateRefreshToken };
