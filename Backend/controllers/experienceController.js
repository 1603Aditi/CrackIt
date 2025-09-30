const Experience = require("../models/Experience");
const Company = require("../models/Company");


exports.addExperience = async (req, res) => {
  const userId = req.user.id;
  try {
    const { companyName, position, content, questions, tags, eventDate } = req.body;

    if (!companyName || !content || !eventDate) {
      return res.status(400).json({ message: "Company name, content and event date are required" });
    }

    let company = await Company.findOne({name: new RegExp(`^${companyName}$`, "i")});
    if (!company) {
      company = await Company.create({ name: companyName.toLowerCase() });
    }

    const newExperience = new Experience({
      userId:req.user._id,
      companyId:company._id ,
      position,
      content,
      tags: tags || [],
      questions:questions || [],
      eventDate: new Date(eventDate),
    });

    await newExperience.save();
    res.status(201).json(newExperience);

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.getAllExperiences = async (req, res) => {
  try {
    const userId = req.user.id; 

    const experiences = await Experience.find({ userId }) 
      .populate("companyId", "name") 
      .sort({ eventDate: -1 }); 

    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate("userId", "fullName email")
      .populate("companyId", "companyName");
    if (!experience) return res.status(404).json({ message: "Experience not found" });
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const { position, content, tags, eventDate, companyName } = req.body;
    let experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    if (experience.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }

    let company = await Company.findOne({name: new RegExp(`^${companyName}$`, "i")});
    if (!company) {
      company = await Company.create({ name: companyName.toLowerCase() });
    }
    

    experience.position = position || experience.position;
    experience.content = content || experience.content;
    experience.tags = tags || experience.tags;
    experience.eventDate = eventDate ? new Date(eventDate) : experience.eventDate;
    experience.companyId = company._id;

    await experience.save();
    res.status(200).json(experience);

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    if (experience.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Experience.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

