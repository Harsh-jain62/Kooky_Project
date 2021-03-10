const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const registrationcontroller = require("../controllers/registrationcontroller");
router.post("/signup", registrationcontroller.signup);
router.post("/login", registrationcontroller.login);
router.post("/sendotp", registrationcontroller.sendotp);
router.post("/otpverfication", registrationcontroller.otpverification);
router.post("/register", registrationcontroller.register);



module.exports = router;
