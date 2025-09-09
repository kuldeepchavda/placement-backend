const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
 
  email: {
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

const User = mongoose.model("admin_testing_1", adminSchema);

module.exports = User;