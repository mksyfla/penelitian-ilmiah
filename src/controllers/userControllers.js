const express = require('express');
const {
  postUserService, getUsersService, getUserByIdService, putUserByIdService,
} = require('../services/userServices');
const { authenticationMiddleware } = require('../middleware/authMiddleware');
const { postUserValidation, putUserValidation } = require('../validation/userValidation');
const { validate } = require('../validation/validation');

const multer = require('../utils/multer');

const userController = express.Router();

userController.post('/api/users', async (req, res, next) => {
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
});

userController.get('/api/users', async (req, res, next) => {
  try {
    const users = await getUsersService({ req });

    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

userController.get('/api/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService({ userId, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

userController.put('/api/profile', authenticationMiddleware(), multer.single('profile'), async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const imageUrl = req.file.path.replace(/\\/g, '/');
    const { name } = validate(putUserValidation, req.body);

    await putUserByIdService({
      userId, name, profile: imageUrl,
    });

    res.status(200).json({
      status: 'success',
      message: 'user berhasil diubah',
    });
  } catch (error) {
    next(error);
  }
});

userController.get('/api/profile', authenticationMiddleware(), async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const user = await getUserByIdService({ userId, req });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { userController };
