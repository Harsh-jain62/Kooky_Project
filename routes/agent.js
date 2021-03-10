const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
var jsonParser = bodyParser.json();
const agentController = require("../controllers/agentcontroller");

router.delete("/deleteagent/:id", agentController.deleteagent);
router.post("/createagent", agentController.createagent);


router.put("/editagentprofile/:id", agentController.editagentprofile);

router.put("/forgetpassword/:id", agentController.forgetpassword);
module.exports = router;
