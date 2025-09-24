
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  bio: { type: String },
  skills: [{ type: String }],
  resumeUrl: { type: String },
  portfolioUrl: { type: String },
  password: { type: String, required:true }
},
  { timestamps: true });

UserSchema.virtual("completeProfile").get(function (){
  return this.fullName && this.email && this.phone ? true : false ;
})

module.exports = mongoose.model("User_testing432", UserSchema);
