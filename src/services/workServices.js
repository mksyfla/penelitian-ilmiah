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
  await verifyDeadline({ id: jobId, deadline: createdAt });

  const id = await postWorkRepository({
    title, content, image, createdAt, updatedAt: createdAt, jobId, userId,
  });

  return id;
}

async function putWorkByIdService({
  id, title, content, image, jobId, userId,
}) {
  await verifyJobExist({ id: jobId });
  await verifyWorkExist({ id });
  await verifyOwnerWork({ id: userId });

  const updatedAt = new Date().toISOString();

  await putWorkByIdRepository({
    id, title, content, image, updatedAt, userId,
  });
}

async function deleteWorkByIdService({
  id, userId, jobId,
}) {
  await verifyJobExist({ id: jobId });
  await verifyWorkExist({ id });
  await verifyOwnerWork({ id: userId });

  await deleteWorkByIdRepository({
    id, userId,
  });
}

async function getWorkByIdService({ id, jobId, req }) {
  const data = await getWorkByIdRepository({ id, jobId });

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
