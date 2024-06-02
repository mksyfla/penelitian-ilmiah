const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().email().max(100).required()
    .messages({
      'string.base': 'email bertipe string',
      'string.email': 'email harus berformat email',
      'string.empty': 'email tidak boleh kosong',
      'string.max': 'email maksimal 100 huruf',
      'any.required': 'email tidak boleh kosong',
    }),
  password: Joi.string().max(100).required().messages({
    'string.base': 'password harus berbentuk string',
    'string.empty': 'password tidak boleh kosong',
    'string.max': 'password maksimal 100 huruf',
    'any.required': 'password tidak boleh kosong',
  }),
});

module.exports = { loginValidation };
