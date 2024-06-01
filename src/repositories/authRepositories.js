const pg = require('../utils/database');
const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');

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

async function addRefreshToken({ token }) {
  const query = {
    text: 'INSERT INTO authentications VALUES($1)',
    values: [token],
  };

  await pg.query(query);
}

async function verifyRefreshToken({ token }) {
  const query = {
    text: 'SELECT token FROM authentications WHERE token = $1',
    values: [token],
  };

  const result = await pg.query(query);

  if (!result.rows.length) {
    throw new InvariantError('Refresh token tidak valid');
  }
}

async function deleteRefreshToken(token) {
  const query = {
    text: 'DELETE FROM authentications WHERE token = $1',
    values: [token],
  };

  await pg.query(query);
}

module.exports = {
  verifyAccount, addRefreshToken, verifyRefreshToken, deleteRefreshToken,
};
