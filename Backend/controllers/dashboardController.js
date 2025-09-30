const Experience = require("../models/Experience");
const Advise = require("../models/Advise");
const QueBank = require("../models/QueBank");
const Community=require("../models/Community")

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; 
    const totalExperiences = await Experience.countDocuments({ userId });
    const advisesDocs = await Community.find({ "advices.userId": userId }).lean();

    let totalAdvices = 0;
    advisesDocs.forEach(doc => {
      // count only advices of this user in each post
      totalAdvices += doc.advices.filter(a => a.userId.toString() === userId).length;
    });
    
    console.log("Total advices by user:", totalAdvices);


    const totalQuestions = await QueBank.countDocuments({ addedBy: userId });
    const recentExperiences = await Experience.find({ userId })
      .sort({ eventDate: -1 })
      .limit(5)
      .populate("companyId", "companyName") 
      .select("companyId position eventDate content questions tags");

    const recentAdvises = await Advise.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("topic date");

    res.status(200).json({
      totalExperiences,
      totalAdvices,
      totalQuestions,
      recentExperiences,
      recentAdvises,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
