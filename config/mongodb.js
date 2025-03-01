require("dotenv/config");
const mongoose = require("mongoose");

// Mongo Cloud url
const MONGO_ATLAS_URL = process.env.MONGO_ATLAS_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_ATLAS_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Database connection failed", e);
  }
};

module.exports = connectDB; 