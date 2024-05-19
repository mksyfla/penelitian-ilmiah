const express = require('express');

const jobControllers = require('../controllers/jobControllers');
const authMiddleware = require('../middleware/authMiddleware');

const jobRoutes = express.Router();

jobRoutes.post(
  '/api/jobs',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.postJob,
);
jobRoutes.put(
  '/api/jobs/:jobId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.putJobById,
);
jobRoutes.delete(
  '/api/jobs/:jobId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('UMKM'),
  jobControllers.deleteJobById,
);
jobRoutes.get('/api/jobs', jobControllers.getJobs);
jobRoutes.get('/api/jobs/:jobId', jobControllers.getJobById);

module.exports = { jobRoutes };
