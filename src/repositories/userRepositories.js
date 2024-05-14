const pg = require('../database/database');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');

async function postUser({
  name, email, password, picture, category, createdAt, updatedAt,
}) {
  const query = {
    text: `
    INSERT INTO
      users(name, email, password, picture, created_at, updated_at, category)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`,
    values: [name, email, password, picture, createdAt, updatedAt, category],
  };

  const result = await pg.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('user gagal ditambahkan');
  }

  return result.rows[0].id;
}

async function verifyEmail({ email }) {
  const query = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email],
  };

  const result = await pg.query(query);

  if (result.rowCount > 0) {
    throw new InvariantError('email telah digunakan');
  }
}

async function getUsers() {
  const query = {
    text: 'SELECT id, name, category, picture FROM users',
  };

  const result = await pg.query(query);

  return result.rows;
}

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

module.exports = {
  postUser, verifyEmail, getUsers, verifyAccount,
};
