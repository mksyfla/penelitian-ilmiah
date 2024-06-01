const path = require('path');
const fs = require('fs');
const workRepositories = require('../repositories/workRepositories');
const jobRepositories = require('../repositories/jobRepositories');

async function postWork({
  title, content, image, jobId, userId, next,
}) {
  const createdAt = new Date().toISOString();

  const filename = `${Date.now()}-${image.name}`;

  image.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  const id = await workRepositories.postWork({
    title, content, image: `public/${filename}`, createdAt, updatedAt: createdAt, jobId, userId,
  });

  return id;
}

async function putWorkById({
  id, title, content, image, jobId, userId, next,
}) {
  await jobRepositories.verifyJobExist({ id: jobId });
  await workRepositories.verifyWorkExist({ id });
  await workRepositories.verifyOwnerWork({ id: userId });
  const result = await workRepositories.getImagePath({ id });

  const updatedAt = new Date().toISOString();

  const filename = `${Date.now()}-${image.name}`;

  image.mv(path.join(__dirname, '../public/') + filename, (error) => {
    if (error) {
      next(error);
    }
  });

  await workRepositories.putWorkById({
    id, title, content, image: `public/${filename}`, updatedAt, userId,
  });

  fs.rm(path.join(__dirname, '../') + result.image, (error) => {
    if (error) {
      next(error);
    }
  });
}

async function deleteWorkById({
  id, userId, jobId, next,
}) {
  await jobRepositories.verifyJobExist({ id: jobId });
  await workRepositories.verifyWorkExist({ id });
  await workRepositories.verifyOwnerWork({ id: userId });
  const result = await workRepositories.getImagePath({ id });

  await workRepositories.deleteWorkById({
    id, userId,
  });

  fs.rm(path.join(__dirname, '../') + result.image, (error) => {
    if (error) {
      next(error);
    }
  });
}

async function getWorkById({ id, jobId, req }) {
  const data = await workRepositories.getWorkById({ id, jobId });

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
  postWork, putWorkById, deleteWorkById, getWorkById,
};
