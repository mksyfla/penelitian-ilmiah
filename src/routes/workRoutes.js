const express = require('express');

const {
  postWorkController, putWorkByIdController, deleteWorkByIdController, getWorkByIdController,
} = require('../controllers/workControllers');
const { authenticationMiddleware, authorizationMiddleware } = require('../middleware/authMiddleware');

const workRoutes = express.Router();

workRoutes.get('/api/jobs/:jobId/works/:workId', getWorkByIdController);

workRoutes.post('/api/jobs/:jobId/works', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), postWorkController);
workRoutes.put('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), putWorkByIdController);
workRoutes.delete('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('MAHASISWA'), deleteWorkByIdController);

module.exports = { workRoutes };
