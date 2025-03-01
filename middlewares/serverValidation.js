const ExpressError = require("../utils/ExpressError");
const { productSchema, userSignupSchema } = require("../schema");

//Server side validation middleware

exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  }
  next();
};

exports.validateSignupUser = (req, res, next) => {
  const { error } = userSignupSchema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  }
  next();
};
