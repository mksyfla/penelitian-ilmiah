const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');

const pg = new Pool();

async function postUser({
  name, email, password, picture, category, createdAt, updatedAt,
}) {
  const query = {
    text: `
    INSERT INTO
      users(name, email, password, picture, created_at, updated_at, category_id)
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
    text: `
    SELECT u.id, u.name, c.category, u.picture
    FROM users as u
    LEFT JOIN categories as c ON u.category_id = c.id`,
  };

  const result = await pg.query(query);

  return result.rows;
}

module.exports = { postUser, verifyEmail, getUsers };
