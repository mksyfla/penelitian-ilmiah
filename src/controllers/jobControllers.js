const jobServices = require('../services/jobServices');

async function postJob(req, res, next) {
  try {
    const { title, content, deadline } = req.body;
    const { id: userId } = req.user;

    const id = await jobServices.postJob({
      title, content, deadline, userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'job telah dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function putJobById(req, res, next) {
  try {
    const { title, content, deadline } = req.body;
    const { id: userId } = req.user;
    const { jobId } = req.params;

    await jobServices.putJobById({
      id: jobId, title, content, deadline, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'job berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
}

async function deleteJobById(req, res, next) {
  try {
    const { id: userId } = req.user;
    const { jobId } = req.params;

    await jobServices.deleteJobById({
      id: jobId, userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'job berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
}

async function getJobs(req, res, next) {
  try {
    const data = await jobServices.getJobs();

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postJob, putJobById, deleteJobById, getJobs
};
