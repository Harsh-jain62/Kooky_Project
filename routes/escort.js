const bodyParser = require("body-parser");
var express = require("express");
let router = express.Router();
var jsonParser = bodyParser.json();
const escortController = require("../controllers/escortcontroller");

 router.delete("/deleteescort/:id", escortController.deleteescort);
 router.post("/insertescortpicture/:id", escortController.insertescortpicture);
 router.post("/verified/:id", escortController.verified);
 router.put("/forgetpassword/:id", escortController.forgetpassword);
 router.put("/update/:id",jsonParser, escortController.update);
module.exports = router;
