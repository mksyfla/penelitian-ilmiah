const { postUserService, getUsersService } = require('../services/userServices');

async function postUserController(req, res, next) {
  try {
    const {
      name, email, password, category,
    } = req.body;

    const id = await postUserService({
      name, email, password, category,
    });

    res.status(201).json({
      status: 'success',
      message: 'user telah dibuat',
      data: {
        id,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getUserController(req, res, next) {
  try {
    const users = await getUsersService();

    res.status(201).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postUserController, getUserController };
