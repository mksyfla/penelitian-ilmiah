const jwt = require('jsonwebtoken');
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
    const users = await userServices.getUsers();

    res.status(200).json({
      status: 'success',
      data: users.map((u) => ({
        ...u,
        picture: `http://${req.headers.host}/${u.picture}`,
      })),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userServices.login({ email, password });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        category: user.category,
      },
      'secretkey',
      { expiresIn: '1h' },
    );

    res.status(200).json({
      status: 'success',
      message: 'login berhasil',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postUser, getUsers, login };
