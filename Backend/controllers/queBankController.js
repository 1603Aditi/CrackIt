const Experience = require("../models/Experience");
const User = require("../models/User");
const Company = require("../models/Company");

exports.getAllQuestions = async (req, res) => {
  try {
    const experiences = await Experience.find({ questions: { $exists: true, $ne: [] } })
      .populate("userId", "fullName email")    // populate user info
      .populate("companyId", "name")           // populate company info
      .select("questions userId companyId");  // only select relevant fields

    const allQuestions = [];
    experiences.forEach(exp => {
      exp.questions.forEach(q => {
        allQuestions.push({
          questionText: q,
          userId: exp.userId,
          company: exp.companyId
        });
      });
    });

    res.status(200).json({
      total: allQuestions.length,
      questions: allQuestions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
