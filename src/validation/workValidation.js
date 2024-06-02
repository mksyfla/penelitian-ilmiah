const Joi = require('joi');

const postUserValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    'string.base': 'name harus berbentuk string',
    'string.empty': 'name tidak boleh kosong',
    'string.max': 'name maksimal 30 huruf',
    'any.required': 'name tidak boleh kosong',
  }),
  email: Joi.string().max(100).required().messages({
    'string.base': 'email harus berbentuk string',
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
  category: Joi.string().max(30).required().messages({
    'string.base': 'category harus berbentuk string',
    'string.empty': 'category tidak boleh kosong',
    'string.max': 'category maksimal 30 huruf',
    'any.required': 'category tidak boleh kosong',
  }),
});

const putUserValidation = Joi.object({
  name: Joi.string().max(30).required().messages({
    'string.base': 'name harus berbentuk string',
    'string.empty': 'name tidak boleh kosong',
    'string.max': 'name maksimal 30 huruf',
    'any.required': 'name tidak boleh kosong',
  }),
  email: Joi.string().max(100).required().messages({
    'string.base': 'email harus berbentuk string',
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

module.exports = { postUserValidation, putUserValidation };
