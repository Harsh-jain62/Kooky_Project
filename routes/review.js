const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reviewcontroller = require("../controllers/reviewcontroller");

router.put("/reviewuser", reviewcontroller.reviewuser);
router.get("/fetchreview", reviewcontroller.fetchreview);

module.exports = router;