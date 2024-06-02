const Joi = require('joi');

const imageValidation = Joi.object({
  mimetype: Joi.any().allow('image/jpeg', 'image/png').required().messages({
    'any.allow': "format file harus 'image/jpeg' atau 'image/png'",
  }),
});

module.exports = { imageValidation };
