const { loginService } = require('../services/authServices');
const { loginValidation } = require('../validation/authValidation');
const validate = require('../validation/validation');

async function loginController(req, res, next) {
  try {
    const { email, password } = validate(loginValidation, req.body);

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
