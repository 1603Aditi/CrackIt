const express = require("express");
const router = express.Router();
const { getCurrentUser, updateProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 


router.get("/me", protect, getCurrentUser);

router.put("/update", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
