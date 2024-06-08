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
const { jobByIdMapped } = require('../utils/mapping');

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
  jobId, title, content, deadline, userId,
}) {
  await verifyJobExist({ jobId });
  await verifyOwnerJob({ jobId, userId });

  const updatedAt = new Date().toISOString();

  await putJobByIdRepository({
    jobId, title, content, deadline, updatedAt, userId,
  });
}

async function deleteJobByIdService({ jobId, userId }) {
  await verifyJobExist({ jobId });
  await verifyOwnerJob({ jobId, userId });

  await deleteJobByIdRepository({ jobId, userId });
}

async function getJobsService() {
  const data = await getJobsRepository();

  return data;
}

async function getJobByIdService({ jobId, req }) {
  const data = await getJobByIdRepository({ jobId });
  const mappedJob = jobByIdMapped({ data, req });

  return mappedJob;
}

async function chooseWork({ jobId, workId, userId }) {
  await verifyJobExist({ jobId });
  await verifyOwnerJob({ jobId, userId });
  await verifyWorkExist({ workId });
  await workChoose({ workId, jobId });
}

module.exports = {
  postJobService,
  putJobByIdService,
  deleteJobByIdService,
  getJobsService,
  getJobByIdService,
  chooseWork,
};
