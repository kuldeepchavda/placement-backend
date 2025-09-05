const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  salary: { type: Number, required: true },
  employmentType: { type: String, enum: ["Full-Time", "Part-Time", "Internship"], default: "Full-Time" },
  benefits: [{ type: String }],
  educationLevel: { type: String },
  experienceLevel: { type: String },
  requiredSkills: [{ type: String }],
  companyName: { type: String, required: true },
  applicationDeadline: { type: Date },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" },
  postingDate: { type: Date, default: Date.now },
}, { timestamps: true });
// this is job 
module.exports = mongoose.model("Job", JobSchema);