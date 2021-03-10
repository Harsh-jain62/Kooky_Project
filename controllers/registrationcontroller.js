const Registration = require('../models/registration.js');
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const nodemailer = require("nodemailer");

exports.signup = async (req, res, next) => {
  const getuser = await Registration.find({ email: req.body.email });
    //  if (getuser) {
    //           return next(new AppError('Mail is exist', 200));
    //     }
  const user = await Registration.create(req.body);
  const bcryptpassword = await bcrypt.hash(user.password, 12);
  const updatepassword = await Registration.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: {
        password: bcryptpassword,
      },
    }
  );
  const token = jwt.sign(
    {
      email: req.body.email,
      password: bcryptpassword,
    },
    config.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  console.log(token);
  console.log(token);
  if (token) {
    res.status(200).json({
      status: "success",
      message: "User created",
    });
  }
};
exports.login= async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await Registration.find({ email: req.body.email });
    console.log("hi");
    console.log(user);

    const bcryptpassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },

      config.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (err) {
    console.log(err);
    status: "fail";
  }
}
exports.sendotp = catchAsync(async (req, res, next) => {
  const user = await Registration.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with email address", 200));
  }
  const otp = Math.floor(10000 + Math.random() * 90000);
  console.log(otp);
  //    const resetToken = createPasswordResetToken(otp);
  await user.save({ validateBeforeSave: false });
  const message = `<p> we have received a request to have your password reset for <b>KOOKY ACCOUNT</b>.
    if you did not make this request ,plese ignore this email.<br>
    <br> To reset your password,plese <a href = "#"><b>visit the link</b></a> </p> <hr>
    <h3><b> Having trouble?</b></h3>
    <p>if the above link does not work try copying this link into your browser.</p>
    <p>${otp}</p></hr>
    <h3><b> Question ?<b></h3>
    <p>plese let us know if there's anything we can help you with by replying to this email or by emailing <b>Kooky.com</b></p>`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Hi,${user.name},here's how to reset your password.(valid for 10 mins)`,
      message,
    });
    const updateOtp = await Registration.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          otp: otp,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "otp sent to email",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpres = undefined;
    await user.save({ validateBeforesave: false });
    return next(
      new AppError("There was an error sending the email .try again later !")
    );
  }
});
exports.otpverification = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await Registration.findOne({ email: req.body.email });

  if (user.otp !== req.body.otp) {
    return next(new AppError("incorrect otp", 200));
  }

  res.status(200).json({
    status: "success",
  });
});


exports.register = catchAsync(async (req, res) => {
  console.log(req.body);
  try {
    if (
      req.body.role == "user" &&
      req.body.password == req.body.confirmpassword
    ) {
      console.log("inside user if", req.body);
      const user = await Registration.create(req.body);
    }
    if (
      req.body.role == "escort" &&
      req.body.password == req.body.confirmpassword
    ) {
      console.log(req.body);
      const user = await Registration.create(req.body);
    }
    if (
      req.body.role == "agency" &&
      req.body.passsword == req.body.confirmpassword
    ) {
      console.log(req.body);
      const user = await Registration.create(req.body);
    }

    res.status(200).json({
      status: "registration succesfully",
      // date:user
    });
  } catch (error) {
    res.status(200).json({
      status: "not succesful",
      err: error,
    });
    console.log(error);
  }
});
