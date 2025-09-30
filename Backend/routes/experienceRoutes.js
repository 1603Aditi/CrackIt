const express = require("express");
const router = express.Router();
const {protect}=require("../middleware/authMiddleware");

const{
  getAllExperiences,
  addExperience,
  getExperience,
  deleteExperience,
  updateExperience
}=require("../controllers/experienceController");

router.post("/add",protect,addExperience);
router.get("/get",protect,getAllExperiences);
router.get("/:id",protect,getExperience);
router.put("/:id",protect,updateExperience);
router.delete("/:id",protect,deleteExperience);


module.exports = router;
