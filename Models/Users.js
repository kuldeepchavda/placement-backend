const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
 
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Users-testings2", userSchema);

module.exports = User;