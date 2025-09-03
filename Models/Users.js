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

// userSchema.pre("save", async (next)=>{
//   if (this.password){
//     const salt = await bcrypt.genSalt(10);
//     this.password  =  await bcrypt.hash(this.password, salt);
//   }
//   next();
// })

userSchema.methods.comparePasswords = async function (password) {
  return bcrypt.compare(password, this.password)

} 
const User = mongoose.model("Users-testings2", userSchema);

module.exports = User;