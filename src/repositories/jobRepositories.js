const pg = require('../utils/database');
const InvariantError = require('../exceptions/InvariantError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const NotFoundError = require('../exceptions/NotFoundError');
// const NotFoundError = require('../exceptions/NotFoundError');

async function postJob({
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
    throw new InvariantError('job gagal ditambahkan');
  }

  return result.rows[0].id;
}

async function putJobById({
  id, title, content, deadline, updatedAt, userId,
}) {
  const query = {
    text: `
    UPDATE jobs
    SET title = $1, content = $2, deadline = $3, updated_at = $4
    WHERE id = $5 AND user_id = $6`,
    values: [title, content, deadline, updatedAt, id, userId],
  };
  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('job tidak ditemukan');
  }
}

async function deleteJobById({ id, userId }) {
  const query = {
    text: `
    DELETE FROM jobs
    WHERE id = $1 AND user_id = $2
    RETURNING id`,
    values: [id, userId],
  };
  const result = await pg.query(query);

  if (!result.rowCount) {
    throw new NotFoundError('job tidak ditemukan');
  }
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

async function getJobs() {
  const query = {
    text: `SELECT j.id, j.title, j.content, u.name
    FROM jobs as j
    LEFT JOIN users as u ON j.user_id = u.id`,
  };

  const result = await pg.query(query);

  return result.rows;
}

// async function getJobById({ id }) {
//   const query = {
//     text: `SELECT u.id, u.name, u.email, u.category, u.profile, j.id as job_id, j.title as job_title, j.content as job_content
//     FROM users as u
//     LEFT JOIN jobs as j ON j.user_id = u.id
//     WHERE (u.id = $1 AND u.category = 'UMKM')
//     ORDER BY j.created_at ASC`,
//     values: [id],
//   };

//   const result = await pg.query(query);
//   return result.rows;
// }

module.exports = {
  postJob, putJobById, verifyOwnerJob, deleteJobById, getJobs,
};
