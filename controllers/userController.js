const User = require("../models/users");
const ExpressError = require("../utils/ExpressError");

// User signup
exports.userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });

    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        message: "User registered successfully",
        data: [req.user],
      });
    });
  } catch (error) {
    next(new ExpressError(500, "Error while registering user"));
  }
};


// User logout
exports.userLogout = async (req, res, next) => {
  
  req.logout((err) => {
    if (err) return next(new ExpressError(500, "Error while login"));
    res
      .status(200)
      .json({ message: "Logged out successfully"});
  });
};
