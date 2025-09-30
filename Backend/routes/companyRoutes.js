const express = require("express");
const router = express.Router();
const { getAllCompanies } = require("../controllers/companyController");

router.get("/get", getAllCompanies);

module.exports = router;
