const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
 
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("admin_testing", adminSchema);

module.exports = User;