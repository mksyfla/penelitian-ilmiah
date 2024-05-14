const userServices = require('../services/userServices');

async function postUser(req, res, next) {
  try {
    const {
      name, email, password, category,
    } = req.body;

    const id = await userServices.postUser({
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

async function getUsers(req, res, next) {
  try {
    const users = await userServices.getUsers({ req });

    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserProfile(req, res, next) {
  try {
    const { id } = req.user;

    const user = await userServices.getUserById({ id, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserById({ id: userId, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

async function putUserById(req, res, next) {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;

    await userServices.putUserById({
      id, name, email, password, profile: '1234567890',
    });

    res.status(200).json({
      status: 'success',
      message: 'data user berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postUser, getUsers, getUserProfile, getUserById, putUserById,
};
