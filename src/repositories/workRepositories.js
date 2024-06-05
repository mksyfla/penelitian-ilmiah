const pg = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthorizationError = require('../exceptions/AuthorizationError');

async function getWorkByIdRepository({ id, jobId }) {
  const query = {
    text: `SELECT w.id, w.title, w.content, w.is_choose, w.image, w.created_at as createdAt, u.name, j.id as job_id
    FROM works as w
    LEFT JOIN users as u ON w.user_id = u.id
    LEFT JOIN jobs as j ON w.job_id = j.id
    WHERE w.id = $1 AND w.job_id = $2
    ORDER BY w.is_choose ASC`,
    values: [id, jobId],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('karya tidak ditemukan');
  }

  return result.rows;
}

async function postWorkRepository({
  title, content, image, createdAt, updatedAt, jobId, userId,
}) {
  const query = {
    text: `INSERT INTO works(title, content, is_choose, image, created_at, updated_at, job_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id`,
    values: [title, content, false, image, createdAt, updatedAt, jobId, userId],
  };

  const result = await pg.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('karya gagal ditambahkan');
  }

  return result.rows[0].id;
}

async function putWorkByIdRepository({
  id, title, content, image, updatedAt, userId,
}) {
  const query = {
    text: `
    UPDATE works
    SET title = $1, content = $2, image = $3, updated_at = $4
    WHERE (id = $5 AND user_id = $6)`,
    values: [title, content, image, updatedAt, id, userId],
  };
  await pg.query(query);
}

async function deleteWorkByIdRepository({ id, userId }) {
  const query = {
    text: 'DELETE FROM works WHERE id = $1 AND job_id = $2',
    values: [id, userId],
  };

  await pg.query(query);
}

async function verifyOwnerWork({ id }) {
  const query = {
    text: 'SELECT id FROM works WHERE user_id = $1',
    values: [id],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new AuthorizationError('anda tidak memiliki akses ini');
  }
}

async function verifyWorkExist({ id }) {
  const query = {
    text: 'SELECT id FROM works WHERE id = $1',
    values: [id],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('karya tidak ditemukan');
  }
}

async function getImagePath({ id }) {
  const query = {
    text: 'SELECT image FROM works WHERE id = $1',
    values: [id],
  };

  const result = await pg.query(query);
  return result.rows[0].image;
}

async function workChoose({ id, jobId }) {
  const query = {
    text: 'UPDATE works SET is_choose = true WHERE id = $1 AND job_id = $2',
    values: [id, jobId],
  };

  await pg.query(query);
}

module.exports = {
  postWorkRepository,
  putWorkByIdRepository,
  verifyWorkExist,
  deleteWorkByIdRepository,
  getWorkByIdRepository,
  verifyOwnerWork,
  getImagePath,
  workChoose,
};
