const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usercontroller = require("../controllers/usercontroller");

router.put("/edituserprofile/:id", usercontroller.edituserprofile);
router.delete("/deleteuser/:id", usercontroller.deleteuser);
router.post("/createuser", usercontroller.createuser);
 router.put("/forgetpassword/:id", usercontroller.forgetpassword);

module.exports = router;