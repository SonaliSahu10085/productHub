const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

/* username key, 
hash and salt key & value by default added by passporttlocalmongoose 
*/

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true}
});

userSchema.plugin(passportLocalMongoose); // Adds username, email & password hashing

module.exports = mongoose.model("User", userSchema);
