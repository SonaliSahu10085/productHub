const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    set: (val) => Math.round(val * 10) / 10, // Rounds to 1 decimal place
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  company: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
