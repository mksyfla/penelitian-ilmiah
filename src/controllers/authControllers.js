const { loginService } = require('../services/authServices');

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const token = await loginService({ email, password });

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

module.exports = { loginController };
