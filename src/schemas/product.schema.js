const Joi = require("joi");

const addProductSchema = Joi.object({
  article_no: Joi.string()
    .max(50)
    .trim()
    .required(),

  name: Joi.string()
    .max(255)
    .trim()
    .required(),

  in_price: Joi.number()
    .precision(2)
    .positive()
    .required(),

  price: Joi.number()
    .precision(2)
    .positive()
    .required(),

  unit: Joi.string()
    .max(100)
    .allow(null, "")
    .optional(),

  stock: Joi.number()
    .precision(2)
    .min(0)
    .optional()
    .default(0),

  description: Joi.string()
    .required()
});

const updateProductSchema = Joi.object({
  article_no: Joi.string()
    .max(50)
    .trim()
    .optional(),

  name: Joi.string()
    .max(255)
    .trim()
    .optional(),

  in_price: Joi.number()
    .precision(2)
    .positive()
    .optional(),

  price: Joi.number()
    .precision(2)
    .positive()
    .optional(),

  unit: Joi.string()
    .max(100)
    .allow(null, "")
    .optional(),

  stock: Joi.number()
    .precision(2)
    .min(0)
    .optional(),

  description: Joi.string()
    .required()
});

const getProductSchema = Joi.object({
  productId: Joi.number().required()
});  

const getAllProductSchema = Joi.object({
  article_no: Joi.string()
    .max(50)
    .trim()
    .allow(null, "")
    .optional(),

  name: Joi.string()
    .max(255)
    .trim()
    .allow(null, "")
    .optional()
});

module.exports = {
  addProductSchema,
  updateProductSchema,
  getProductSchema,
  getAllProductSchema
};