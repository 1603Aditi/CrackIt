const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  getMyAdvices,
  addAnswer,
  updatePost,
  deletePost
} = require("../controllers/communityController");

router.get("/get", protect, getAllPosts);

router.get("/my-advices", protect, getMyAdvices);

router.post("/add", protect, createPost);

router.post("/:postId/answer", protect, addAnswer);

router.put("/:postId/update", protect, updatePost);

router.delete("/:postId/delete", protect, deletePost);

module.exports = router;
