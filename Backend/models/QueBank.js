const mongoose = require("mongoose");

const QueBankSchema = new mongoose.Schema({
  questionText: { type: String, required: true, unique: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  tags: [{ type: String, lowercase: true }],
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("QueBank", QueBankSchema);
