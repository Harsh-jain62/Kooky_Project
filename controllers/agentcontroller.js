const Agent = require("../models/agentModel.js");
const bcrypt = require("bcrypt");
  exports.deleteagent = function (req, res) {
    console.log(req.params);
    Agent.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  exports.createagent = async (req, res, next) => {
    const create = await Agent.create(req.body);
    res.status(200).json({
      status: "success",
      data: create,
    });
  };
  exports.editagentprofile = async function (req, res) {
      console.log(req.body);
    Agent.findByIdAndUpdate(
      { _id: req.params.id },

      {
        $set: {
          agencyname: req.body.agencyname,
          email: req.body.email,
          ownername:req.body.ownername,
          city:req.body.city,
          country:req.body.country,
          setpercent:req.body.setpercent    
        },
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
   exports.forgetpassword = async function (req, res) {
    if (req.body.password === req.body.confirmpassword) {
      let newPassword = req.body.password.toString();

      bcryptpassword = await bcrypt.hash(newPassword, 12);
      console.log(bcryptpassword);
      Agent.findByIdAndUpdate(
        { _id: req.params.id },

        { $set: { password: bcryptpassword } }
      ).then((result) => {
        res.status(200).json(result);
      });
    }

    console.warn("password does not match");
  };