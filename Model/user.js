const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fistName: String,
  lastName: String,
  company: String,
  email: String,
  contact: String,
  password: String,
});

module.exports = new mongoose.model("User", userSchema);
