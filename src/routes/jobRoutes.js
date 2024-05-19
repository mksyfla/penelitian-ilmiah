const express = require('express');

const jobControllers = require('../controllers/jobControllers');
const authMiddleware = require('../middleware/authMiddleware');

const jobRoutes = express.Router();

jobRoutes.post(
  '/api/v1/jobs',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.postJob,
);
jobRoutes.put(
  '/api/v1/jobs/:jobId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.putJobById,
);
jobRoutes.delete(
  '/api/v1/jobs/:jobId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.deleteJobById,
);
jobRoutes.get('/api/v1/jobs', jobControllers.getJobs);
jobRoutes.get('/api/v1/jobs/:jobId', jobControllers.getJobById);

module.exports = { jobRoutes };
