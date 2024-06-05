const express = require('express');
const {
  postJobService,
  putJobByIdService,
  deleteJobByIdService,
  getJobsService,
  getJobByIdService,
  chooseWork,
} = require('../services/jobServices');
const { authenticationMiddleware, authorizationMiddleware } = require('../middleware/authMiddleware');
const { postJobValidation, putJobValidation } = require('../validation/jobValidation');
const { validate } = require('../validation/validation');

const jobController = express.Router();

jobController.get('/api/jobs', async (req, res, next) => {
  try {
    const data = await getJobsService();

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
});

jobController.get('/api/jobs/:jobId', async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const data = await getJobByIdService({ id: jobId, req });
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
});

jobController.post('/api/jobs', authenticationMiddleware(), authorizationMiddleware('UMKM'), async (req, res, next) => {
  try {
    const { title, content, deadline } = validate(postJobValidation, req.body);
    const { id: userId } = req.user;

    const id = await postJobService({
      title, content, deadline, userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'kriteria berhasil ditambahkan',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
});

jobController.put('/api/jobs/:jobId', authenticationMiddleware(), authorizationMiddleware('UMKM'), async (req, res, next) => {
  try {
    const { title, content, deadline } = validate(putJobValidation, req.body);
    const { id: userId } = req.user;
    const { jobId } = req.params;

    await putJobByIdService({
      id: jobId, title, content, deadline, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'kriteria berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
});

jobController.delete('/api/jobs/:jobId', authenticationMiddleware(), authorizationMiddleware('UMKM'), async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { jobId } = req.params;

    await deleteJobByIdService({
      id: jobId, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'kriteria berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
});

jobController.post('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('UMKM'), async (req, res, next) => {
  try {
    const { jobId, workId } = req.params;
    const { id: userId } = req.user;

    await chooseWork({
      id: jobId, workId, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'karya telah dipilih',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { jobController };
