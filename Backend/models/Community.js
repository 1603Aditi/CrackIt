const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now },
  advices: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      body: { type: String, required: true },
      upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      createdAt: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Community",CommunitySchema);
