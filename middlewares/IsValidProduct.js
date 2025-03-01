const mongoose = require("mongoose");
const ExpressError = require("../utils/ExpressError");
const Product = require("../models/products");

module.exports = async (req, res, next) => {
  const { productId } = req.params;

  // Validate ObjectId before querying
  if (!mongoose.isValidObjectId(productId)) {
    return next(new ExpressError(400, "Invalid Product ID"));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ExpressError(404, "Product not available."));
  }
  next();
};
