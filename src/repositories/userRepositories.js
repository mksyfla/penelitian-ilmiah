const pg = require('../database/database');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

async function postUser({
  name, email, password, profile, category, createdAt, updatedAt,
}) {
  const query = {
    text: `
    INSERT INTO
      users(name, email, password, profile, created_at, updated_at, category)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`,
    values: [name, email, password, profile, createdAt, updatedAt, category],
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
    text: 'SELECT id, name, category, profile FROM users',
  };

  const result = await pg.query(query);

  return result.rows;
}

async function checkUserExist({ id }) {
  const query = {
    text: 'SELECT id, category FROM users WHERE id = $1',
    values: [id],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('user tidak ditemukan');
  }

  return result.rows[0];
}

async function getUserUMKM({ id }) {
  const query = {
    text: `SELECT u.id, u.name, u.email, u.category, u.profile, j.id as job_id, j.title as job_title, j.content as job_content
    FROM users as u
    LEFT JOIN jobs as j ON j.user_id = u.id
    WHERE u.id = $1
    ORDER BY j.created_at ASC`,
    values: [id],
  };

  const result = await pg.query(query);
  return result.rows;
}

async function getUserMahasiswa({ id }) {
  const query = {
    text: `SELECT u.id, u.name, u.email, u.category, u.profile, w.id as work_id, w.title as work_title, w.content as work_content, w.image as work_image
    FROM users as u
    LEFT JOIN works as w ON w.user_id = u.id
    WHERE u.id = $1`,
    values: [id],
  };

  const result = await pg.query(query);
  return result.rows;
}

module.exports = {
  postUser, verifyEmail, getUsers, getUserUMKM, getUserMahasiswa, checkUserExist,
};
