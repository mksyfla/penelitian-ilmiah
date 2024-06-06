const {
  postWorkRepository,
  putWorkByIdRepository,
  verifyWorkExist,
  deleteWorkByIdRepository,
  getWorkByIdRepository,
  verifyOwnerWork,
} = require('../repositories/workRepositories');
const {
  verifyJobExist,
  verifyDeadline,
} = require('../repositories/jobRepositories');

async function postWorkService({
  title, content, image, jobId, userId,
}) {
  const createdAt = new Date().toISOString();
  await verifyDeadline({ jobId, deadline: createdAt });

  const id = await postWorkRepository({
    title, content, image, createdAt, updatedAt: createdAt, jobId, userId,
  });

  return id;
}

async function putWorkByIdService({
  workId, title, content, image, jobId, userId,
}) {
  await verifyJobExist({ jobId });
  await verifyWorkExist({ workId });
  await verifyOwnerWork({ userId });

  const updatedAt = new Date().toISOString();

  await putWorkByIdRepository({
    workId, title, content, image, updatedAt, userId,
  });
}

async function deleteWorkByIdService({
  workId, userId, jobId,
}) {
  await verifyJobExist({ jobId });
  await verifyWorkExist({ workId });
  await verifyOwnerWork({ userId });

  await deleteWorkByIdRepository({
    workId, userId,
  });
}

async function getWorkByIdService({ workId, jobId, req }) {
  const data = await getWorkByIdRepository({ workId, jobId });

  const mappedJob = data.map((d) => ({
    id: d.id,
    title: d.title,
    content: d.content,
    isChoose: d.is_choose,
    image: `http://${req.headers.host}/${d.image}`,
    createdAt: d.createdAt,
    creator: d.name,
    jobId: d.job_id,
  }));

  return mappedJob;
}

module.exports = {
  postWorkService, putWorkByIdService, deleteWorkByIdService, getWorkByIdService,
};
