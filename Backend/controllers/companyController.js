const Company = require("../models/Company");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 }); 
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
