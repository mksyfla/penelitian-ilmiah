const workServices = require('../services/workServices');

async function postWork(req, res, next) {
  try {
    const { title, content } = req.body;
    const { image } = req.files;
    const { jobId } = req.params;
    const { id: userId } = req.user;

    const id = await workServices.postWork({
      title, content, image, jobId, userId, next,
    });

    res.status(201).json({
      status: 'success',
      message: 'work berhasil dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function putWorkById(req, res, next) {
  try {
    const { title, content } = req.body;
    const { image } = req.files;
    const { jobId, workId } = req.params;
    const { id: userId } = req.user;

    await workServices.putWorkById({
      id: workId, title, content, image, jobId, userId, next,
    });

    res.status(200).json({
      status: 'success',
      message: 'work berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
}

async function deleteWorkById(req, res, next) {
  try {
    const { jobId, workId } = req.params;
    const { id: userId } = req.user;

    await workServices.deleteWorkById({
      id: workId, jobId, userId, next,
    });

    res.status(200).json({
      status: 'success',
      message: 'work berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
}

async function getWorkById(req, res, next) {
  try {
    const { jobId, workId } = req.params;

    const data = await workServices.getWorkById({
      id: workId, next,
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postWork, putWorkById, deleteWorkById, getWorkById,
};
