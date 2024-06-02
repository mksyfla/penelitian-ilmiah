const {
  postUserService, getUsersService, getUserByIdService, putUserByIdService,
} = require('../services/userServices');
const { postUserValidation } = require('../validation/userValidation');
const { validate } = require('../validation/validation');

async function postUserController(req, res, next) {
  try {
    const {
      name, email, password, category,
    } = validate(postUserValidation, req.body);

    const id = await postUserService({
      name, email, password, category,
    });

    res.status(201).json({
      status: 'success',
      message: 'user berhasil dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getUsersController(req, res, next) {
  try {
    const users = await getUsersService({ req });

    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProfileController(req, res, next) {
  try {
    const { id } = req.user;

    const user = await getUserByIdService({ id, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserByIdController(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService({ id: userId, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function putUserByIdController(req, res, next) {
  try {
    const { id } = req.user;
    const { profile } = req.files;
    const { name, password } = req.body;

    await putUserByIdService({
      id, name, password, profile, next,
    });

    res.status(200).json({
      status: 'success',
      message: 'user berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postUserController,
  getUsersController,
  getUserProfileController,
  getUserByIdController,
  putUserByIdController,
};
