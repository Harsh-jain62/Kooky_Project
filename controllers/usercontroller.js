const User= require("../models/user.js");
const bcrypt = require("bcrypt");
 exports.createuser= async (req, res, next) => {
    const user= await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: user,
    });
  };
  exports.edituserprofile = async function (req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.id },

      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          contactnumber: req.body.contactnumber,
          hotelname: req.body.hotelname,
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
  exports.deleteuser = function (req, res) {
    console.log(req.params);
    User.deleteOne({ _id: req.params.id })
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
        User.findByIdAndUpdate(
          { _id: req.params.id },

          { $set: { password: bcryptpassword } }
        ).then((result) => {
          res.status(200).json(result);
        });
      }

      console.warn("password does not match");
    };
  


      exports.fetchratings= async (req, res, next) =>{
          const getData = await User.find()
            res.status(200).json({
             status:"success",
             results:getData.length,
             data:getData.ratings,
         })
      }