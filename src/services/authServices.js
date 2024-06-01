const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRepositories = require('../repositories/authRepositories');
const AuthenticationError = require('../exceptions/AuthenticationError');

async function loginService({ email, password }) {
  const result = await authRepositories.verifyAccount({ email });
  const match = await bcrypt.compare(password, result.password);

  if (!match) {
    throw new AuthenticationError('email atau password salah');
  }

  const token = jwt.sign(
    {
      id: result.id,
      email: result.email,
      category: result.category,
    },
    'secretkey',
    { expiresIn: '1d' },
  );

  return token;
}

module.exports = { loginService };
