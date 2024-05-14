const authServices = require('../services/authServices');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const token = await authServices.login({ email, password });

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

module.exports = { login };
