const pg = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

async function postWork({
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
    throw new InvariantError('job gagal ditambahkan');
  }

  return result.rows[0].id;
}

async function putWorkById({
  id, title, content, image, updatedAt, jobId, userId,
}) {
  const query = {
    text: `
    UPDATE jobs
    SET title = $1, content = $2, image = $3, updated_at = $4
    WHERE id = $5 AND job_id = $6 AND user_id = $7`,
    values: [title, content, image, updatedAt, id, jobId, userId],
  };
  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('work tidak ditemukan');
  }
}

async function checkWorkExist({ id, jobId }) {
  const query = {
    text: 'SELECT id, image FROM works WHERE id = $1 AND job_id = $2',
    values: [id, jobId],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('work tidak ditemukan');
  }

  return result.rows[0];
}

async function deleteWorkById({ id, userId }) {
  const query = {
    text: 'DELETE FROM works WHERE id = $1 AND job_id = $2',
    values: [id, userId],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('work tidak ditemukan');
  }

  return result.rows[0];
}

async function getWorkById({ id }) {
  const query = {
    text: `SELECT w.id, w.title, w.content, w.is_choose, w.image, w.created_at as createdAt, u.name
    FROM works as w
    LEFT JOIN users as u ON w.user_id = u.id
    WHERE w.id = $1
    ORDER BY w.is_choose ASC`,
    values: [id],
  };

  const result = await pg.query(query);
  return result.rows;
}

module.exports = {
  postWork, putWorkById, checkWorkExist, deleteWorkById, getWorkById,
};
