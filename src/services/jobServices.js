const jobRepositories = require('../repositories/jobRepositories');
const mapping = require('../utils/mapping');

async function postJob({
  title, content, deadline, userId,
}) {
  const createdAt = new Date().toISOString();
  const newDeadline = new Date(deadline);

  const id = await jobRepositories.postJob({
    title,
    content,
    deadline: newDeadline,
    userId,
    createdAt,
    updatedAt: createdAt,
  });

  return id;
}

async function putJobById({
  id, title, content, deadline, userId,
}) {
  await jobRepositories.verifyOwnerJob({ id: userId });

  const updatedAt = new Date().toISOString();

  await jobRepositories.putJobById({
    id, title, content, deadline, updatedAt, userId,
  });
}

async function deleteJobById({ id, userId }) {
  await jobRepositories.verifyOwnerJob({ id: userId });

  await jobRepositories.deleteJobById({ id, userId });
}

async function getJobs() {
  const data = await jobRepositories.getJobs();

  return data;
}

async function getJobById({ id, req }) {
  const data = await jobRepositories.getJobById({ id });
  const mappedJob = mapping.jobByIdMapped({ data, req });

  return mappedJob;
}

module.exports = {
  postJob, putJobById, deleteJobById, getJobs, getJobById,
};
