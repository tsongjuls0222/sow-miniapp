const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required(),

  password: Joi.string()
    .min(6)
    .max(100)
    .required()
});

const languageSchema = Joi.object({
  code: Joi.string()
    .length(2)
    .lowercase()
    .trim()
    .required()
});




module.exports = {
  loginSchema,
  languageSchema
};