const Product = require("../models/products");
const passport = require("passport");
const ExpressError = require("../utils/ExpressError");

exports.IsAuthenticated = (req, res, next) => {
  //If not logged in
  if (!req.isAuthenticated()) {
    return next(new ExpressError(401, "Unauthorized. Please log in."));
  }
  next();
};

exports.IsOwner = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product.owner.equals(req.user._id)) {
    return next(
      new ExpressError(
        403,
        "Access Denied! Only product owners have access to this endpoint."
      )
    );
  }
  next();
};

exports.passportAuth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(new ExpressError(500, "Internal Server Error"));
    }
    if (!user) {
      return next(new ExpressError(401, info.message || "Invalid Credentials"));
    }

    req.login(user, (err) => {
      if (err) {
        return next(new ExpressError(500, "Login Failed."));
      }
      res.json({ success: true, message: "Login successful", user }); // ✅ Send response only once
    });
  })(req, res, next);
};
