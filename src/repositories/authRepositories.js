const pg = require('../database/database');
const AuthenticationError = require('../exceptions/AuthenticationError');

async function verifyAccount({ email }) {
  const query = {
    text: 'SELECT id, email, password, category FROM users WHERE email = $1',
    values: [email],
  };

  const result = await pg.query(query);

  if (!result.rows[0]) {
    throw new AuthenticationError('email atau password salah');
  }

  return result.rows[0];
}

module.exports = { verifyAccount };
