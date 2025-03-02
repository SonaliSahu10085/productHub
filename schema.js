const joi = require("joi");

exports.productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  featured: joi.boolean().default(false),
  rating: joi.number().required().min(0).max(5),
  company: joi.string().required(),
});

exports.userSignupSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
