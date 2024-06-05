const express = require('express');
const {
  postWorkService, putWorkByIdService, deleteWorkByIdService, getWorkByIdService,
} = require('../services/workServices');
const { authenticationMiddleware, authorizationMiddleware } = require('../middleware/authMiddleware');
const { postWorkValidation, putWorkValidation } = require('../validation/workValidation');
const { validate } = require('../validation/validation');

const multer = require('../utils/multer');

const workController = express.Router();

workController.get('/api/jobs/:jobId/works/:workId', async (req, res, next) => {
  try {
    const { jobId, workId } = req.params;

    const data = await getWorkByIdService({
      id: workId, jobId, req,
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
});

workController.post('/api/jobs/:jobId/works', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), multer.single('image'), async (req, res, next) => {
  try {
    const { title, content } = validate(postWorkValidation, req.body);
    const imageUrl = req.file.path.replace(/\\/g, '/');
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const id = await postWorkService({
      title, content, image: imageUrl, jobId, userId, next,
    });

    res.status(201).json({
      status: 'success',
      message: 'karya berhasil dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
});

workController.put('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), multer.single('image'), async (req, res, next) => {
  try {
    const { title, content } = validate(putWorkValidation, req.body);
    const imageUrl = req.file.path.replace(/\\/g, '/');
    const { jobId, workId } = req.params;
    const { id: userId } = req.user;

    await putWorkByIdService({
      id: workId, title, content, image: imageUrl, jobId, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'karya berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
});

workController.delete('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), async (req, res, next) => {
  try {
    const { jobId, workId } = req.params;
    const { id: userId } = req.user;

    await deleteWorkByIdService({
      id: workId, jobId, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'karya berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { workController };
