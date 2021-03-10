const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
var jsonParser = bodyParser.json();
const bookingController = require("../controllers/bookingcontroller");
router.post("/bookescort", bookingController.bookescort);



module.exports = router;
