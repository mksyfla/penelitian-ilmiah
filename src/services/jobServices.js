const {
  postJobRepository,
  putJobByIdRepository,
  verifyOwnerJob,
  deleteJobByIdRepository,
  getJobsRepository,
  getJobByIdRepository,
  verifyJobExist,
} = require('../repositories/jobRepositories');
const { verifyWorkExist, workChoose } = require('../repositories/workRepositories');
const mapping = require('../utils/mapping');

async function postJobService({
  title, content, deadline, userId,
}) {
  const createdAt = new Date().toISOString();
  const newDeadline = new Date(deadline);

  const id = await postJobRepository({
    title,
    content,
    deadline: newDeadline,
    userId,
    createdAt,
    updatedAt: createdAt,
  });

  return id;
}

async function putJobByIdService({
  id, title, content, deadline, userId,
}) {
  await verifyJobExist({ id });
  await verifyOwnerJob({ id: userId });

  const updatedAt = new Date().toISOString();

  await putJobByIdRepository({
    id, title, content, deadline, updatedAt, userId,
  });
}

async function deleteJobByIdService({ id, userId }) {
  await verifyJobExist({ id });
  await verifyOwnerJob({ id: userId });

  await deleteJobByIdRepository({ id, userId });
}

async function getJobsService() {
  const data = await getJobsRepository();

  return data;
}

async function getJobByIdService({ id, req }) {
  const data = await getJobByIdRepository({ id });
  const mappedJob = mapping.jobByIdMapped({ data, req });

  return mappedJob;
}

async function chooseWork({ id, workId, userId }) {
  await verifyJobExist({ id });
  await verifyOwnerJob({ id: userId });
  await verifyWorkExist({ id: workId });
  await workChoose({ id: workId, jobId: workId });
}

module.exports = {
  postJobService,
  putJobByIdService,
  deleteJobByIdService,
  getJobsService,
  getJobByIdService,
  chooseWork,
};
