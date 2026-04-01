const Joi = require("joi");

const languageSchema = Joi.object({
  code: Joi.string()
    .length(2)
    .lowercase()
    .trim()
    .required()
});




module.exports = {
  languageSchema
};