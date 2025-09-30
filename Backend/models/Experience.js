const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required:true }, 
  position: { type: String },
  content: { type: String, required: true },
  questions: [{ type: String,default: [] }],
  tags: [{ type: String ,default: []}],
  eventDate: { type: Date, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Experience", ExperienceSchema);


