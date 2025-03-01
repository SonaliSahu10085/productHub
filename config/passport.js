const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

// Use Passport Local Strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize user (store in session)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
