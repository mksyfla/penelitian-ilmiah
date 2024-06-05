const {
  postWorkService, putWorkByIdService, deleteWorkByIdService, getWorkByIdService,
} = require('../services/workServices');
const { validate } = require('../validation/validation');
const { postWorkValidation, putWorkValidation } = require('../validation/workValidation');

async function postWorkController(req, res, next) {
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
}

async function putWorkByIdController(req, res, next) {
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
}

async function deleteWorkByIdController(req, res, next) {
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
}

async function getWorkByIdController(req, res, next) {
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
}

module.exports = {
  postWorkController, putWorkByIdController, deleteWorkByIdController, getWorkByIdController,
};
