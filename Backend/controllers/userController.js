const User = require("../models/User");

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = { ...req.body };

    
    if (req.file) {
      const imgRes = await uploadImage(req.file);
      updates.profileImageUrl = imgRes.imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
