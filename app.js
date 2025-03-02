const express = require("express");
const cors = require("cors");

const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const User = require("./models/users");
const connectDB = require("./config/mongodb");
const ExpressError = require("./utils/ExpressError");

const userRouter = require("./routes/users");
const productRouter = require("./routes/products");

// Connection with db
connectDB();

// loading the passport configuration
require("./config/passport");

// Allow frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Session setup for production
const MongoStoreOptions = {
  mongoUrl: process.env.MONGO_ATLAS_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
};
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 15 * 60 * 1000,
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
  },
  store: MongoStore.create(MongoStoreOptions),
};

app.use(session(sessionOptions));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Mount Points of APIs
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.all("*", function (req, res, next) {
  next(new ExpressError(404, "Endpoint not exists"));
});

//Error handling middleware
app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;
