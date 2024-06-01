const pg = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const NotFoundError = require('../exceptions/NotFoundError');

async function getJobsRepository() {
  const query = {
    text: `
    SELECT j.id, j.title, j.content, u.name
    FROM jobs as j
    LEFT JOIN users as u ON j.user_id = u.id`,
  };

  const result = await pg.query(query);

  return result.rows;
}

async function getJobByIdRepository({ id }) {
  const query = {
    text: `SELECT j.id, j.title, j.content, j.deadline, u.name, w.id as work_id, w.title as work_title, w.content as work_content, w.image as work_image, w.is_choose as work_is_choose, u2.name as work_name
    FROM jobs as j
    LEFT JOIN works as w ON w.job_id = j.id
    LEFT JOIN users as u ON j.user_id = u.id
    LEFT JOIN users as u2 ON w.user_id = u2.id
    WHERE j.id = $1
    ORDER BY w.is_choose DESC`,
    values: [id],
  };

  const result = await pg.query(query);
  return result.rows;
}

async function postJobRepository({
  title, content, deadline, createdAt, updatedAt, userId,
}) {
  const query = {
    text: `
    INSERT INTO jobs(title, content, deadline, created_at, updated_at, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`,
    values: [title, content, deadline, createdAt, updatedAt, userId],
  };

  const result = await pg.query(query);

  if (!result.rows[0].id) {
    throw new InvariantError('kriteria gagal ditambahkan');
  }

  return result.rows[0].id;
}

async function putJobByIdRepository({
  id, title, content, deadline, updatedAt, userId,
}) {
  const query = {
    text: `
    UPDATE jobs
    SET title = $1, content = $2, deadline = $3, updated_at = $4
    WHERE id = $5 AND user_id = $6`,
    values: [title, content, deadline, updatedAt, id, userId],
  };
  await pg.query(query);
}

async function deleteJobByIdRepository({ id, userId }) {
  const query = {
    text: `
    DELETE FROM jobs
    WHERE id = $1 AND user_id = $2
    RETURNING id`,
    values: [id, userId],
  };
  await pg.query(query);
}

async function verifyOwnerJob({ id }) {
  const query = {
    text: 'SELECT id FROM jobs WHERE user_id = $1',
    values: [id],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new AuthorizationError('anda tidak memiliki akses ini');
  }
}

async function verifyJobExist({ id }) {
  const query = {
    text: 'SELECT id FROM jobs WHERE id = $1',
    values: [id],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('kriteria tidak ditemukan');
  }
}

async function verifyDeadline({ id, deadline }) {
  const query = {
    text: 'SELECT id FROM jobs WHERE id = $1 AND deadline > $2',
    values: [id, deadline],
  };

  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new InvariantError('kriteria ini telah selesai');
  }
}

module.exports = {
  postJobRepository,
  putJobByIdRepository,
  verifyOwnerJob,
  deleteJobByIdRepository,
  getJobsRepository,
  getJobByIdRepository,
  verifyJobExist,
  verifyDeadline,
};
