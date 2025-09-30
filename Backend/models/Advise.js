const mongoose = require("mongoose");

const AdviseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },      
  body: { type: String, required: true },                                              
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],                 
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],                
  createdAt: { type: Date, default: Date.now }                                         
}, { timestamps: true });

module.exports = mongoose.model("Advise", AdviseSchema);
