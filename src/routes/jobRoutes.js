const express = require('express');

const {
  postJobController,
  putJobByIdController,
  deleteJobByIdController,
  getJobsController,
  getJobByIdController,
  chooseWorkController,
} = require('../controllers/jobControllers');
const { authenticationMiddleware, authorizationMiddleware } = require('../middleware/authMiddleware');

const jobRoutes = express.Router();

jobRoutes.get('/api/jobs', getJobsController);
jobRoutes.get('/api/jobs/:jobId', getJobByIdController);

jobRoutes.post('/api/jobs', authenticationMiddleware(), authorizationMiddleware('UMKM'), postJobController);
jobRoutes.put('/api/jobs/:jobId', authenticationMiddleware(), authorizationMiddleware('UMKM'), putJobByIdController);
jobRoutes.delete('/api/jobs/:jobId', authenticationMiddleware(), authorizationMiddleware('UMKM'), deleteJobByIdController);
jobRoutes.post('/api/jobs/:jobId/works/:workId', authenticationMiddleware(), authorizationMiddleware('UMKM'), chooseWorkController);

module.exports = { jobRoutes };
