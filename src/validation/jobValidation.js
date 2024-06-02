const Joi = require('joi');

const postJobValidation = Joi.object({
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
  deadline: Joi.date().required().messages({
    'date.base': 'deadline harus berbentuk timestamp',
    'date.empty': 'deadline tidak boleh kosong',
    'any.required': 'deadline tidak boleh kosong',
  }),
});

const putJobValidation = Joi.object({
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
  deadline: Joi.date().required().messages({
    'date.base': 'deadline harus berbentuk tanggal',
    'date.empty': 'deadline tidak boleh kosong',
    'any.required': 'deadline tidak boleh kosong',
  }),
});

module.exports = { postJobValidation, putJobValidation };
