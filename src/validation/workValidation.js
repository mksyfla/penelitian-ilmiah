const Joi = require('joi');

const postWorkValidation = Joi.object({
  title: Joi.string().max(50).required().messages({
    'string.base': 'title harus berbentuk string',
    'string.empty': 'title tidak boleh kosong',
    'string.max': 'title maksimal 50 huruf',
    'any.required': 'title tidak boleh kosong',
  }),
  content: Joi.string().required().messages({
    'string.base': 'content harus berbentuk string',
    'string.empty': 'content tidak boleh kosong',
    'any.required': 'content tidak boleh kosong',
  }),
});

const putWorkValidation = Joi.object({
  title: Joi.string().max(50).required().messages({
    'string.base': 'title harus berbentuk string',
    'string.empty': 'title tidak boleh kosong',
    'string.max': 'title maksimal 50 huruf',
    'any.required': 'title tidak boleh kosong',
  }),
  content: Joi.string().required().messages({
    'string.base': 'content harus berbentuk string',
    'string.empty': 'content tidak boleh kosong',
    'any.required': 'content tidak boleh kosong',
  }),
});

module.exports = { postWorkValidation, putWorkValidation };
