const express = require('express');

const workControllers = require('../controllers/workControllers');
const authMiddleware = require('../middleware/authMiddleware');

const workRoutes = express.Router();

workRoutes.post(
  '/api/jobs/:jobId/works',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('MAHASISWA'),
  workControllers.postWork,
);
workRoutes.put(
  '/api/jobs/:jobId/works/:workId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('MAHASISWA'),
  workControllers.putWorkById,
);
workRoutes.delete(
  '/api/jobs/:jobId/works/:workId',
  authMiddleware.authenticationMiddleware(),
  authMiddleware.authorizationMiddleware('MAHASISWA'),
  workControllers.deleteWorkById,
);
workRoutes.get('/api/jobs/:jobId/works/:workId', workControllers.getWorkById);

module.exports = { workRoutes };
