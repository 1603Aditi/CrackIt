const express = require("express");
const router = express.Router();
const { getAllQuestions} = require("../controllers/queBankController");

router.get("/get", getAllQuestions);

module.exports = router;
