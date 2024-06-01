const path = require('path');
const fs = require('fs');
const {
  postWorkRepository,
  putWorkByIdRepository,
  verifyWorkExist,
  deleteWorkByIdRepository,
  getWorkByIdRepository,
  verifyOwnerWork,
  getImagePath,
} = require('../repositories/workRepositories');
const jobRepositories = require('../repositories/jobRepositories');

async function postWorkService({
  title, content, image, jobId, userId, next,
}) {
  const createdAt = new Date().toISOString();
  await jobRepositories.verifyDeadline({ id: jobId, deadline: createdAt });

  const filename = `${Date.now()}-${image.name}`;

  image.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  const id = await postWorkRepository({
    title, content, image: `public/${filename}`, createdAt, updatedAt: createdAt, jobId, userId,
  });

  return id;
}

async function putWorkByIdService({
  id, title, content, image, jobId, userId, next,
}) {
  await jobRepositories.verifyJobExist({ id: jobId });
  await verifyWorkExist({ id });
  await verifyOwnerWork({ id: userId });
  const result = await getImagePath({ id });

  const updatedAt = new Date().toISOString();

  const filename = `${Date.now()}-${image.name}`;

  image.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  await putWorkByIdRepository({
    id, title, content, image: `public/${filename}`, updatedAt, userId,
  });

  fs.rm(path.join(__dirname, '../') + result.image, (error) => {
    if (error) {
      next(error);
    }
  });
}

async function deleteWorkByIdService({
  id, userId, jobId, next,
}) {
  await jobRepositories.verifyJobExist({ id: jobId });
  await verifyWorkExist({ id });
  await verifyOwnerWork({ id: userId });
  const result = await getImagePath({ id });

  await deleteWorkByIdRepository({
    id, userId,
  });

  fs.rm(path.join(__dirname, '../') + result.image, (error) => {
    if (error) {
      next(error);
    }
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
  }));

  return mappedJob;
}

module.exports = {
  postWorkService, putWorkByIdService, deleteWorkByIdService, getWorkByIdService,
};
