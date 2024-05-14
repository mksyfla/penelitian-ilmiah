const pg = require('../database/database');
const InvariantError = require('../exceptions/InvariantError');

async function addRefreshToken(token) {
  const query = {
    text: 'INSERT INTO authentications VALUES($1)',
    values: [token],
  };

  await pg.query(query);
}

async function verifyRefreshToken(token) {
  const query = {
    text: 'SELECT token FROM authentications WHERE token = $1',
    values: [token],
  };

  const result = await pg.query(query);

  if (!result.rows.length) {
    throw new InvariantError('refresh token tidak valid');
  }
}

async function deleteRefreshToken(token) {
  const query = {
    text: 'DELETE FROM authentications WHERE token = $1',
    values: [token],
  };

  await pg.query(query);
}

module.exports = { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
