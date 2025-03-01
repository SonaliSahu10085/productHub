const express = require("express");
const userController = require("../controllers/userController");
const wrapAsync = require("../utils/wrapAsync");
const { validateSignupUser } = require("../middlewares/serverValidation");
const {passportAuth} = require("../middlewares/auth")

const router = express.Router();

// Register User
router.post(
  "/signup",
  validateSignupUser,
  wrapAsync(userController.userSignup)
);

// Login User
router.post(
  "/login",
  passportAuth
);

// Logout User
router.get("/logout", wrapAsync(userController.userLogout));

module.exports = router;
