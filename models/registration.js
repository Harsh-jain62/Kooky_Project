const mongoose = require("mongoose");
const RegistrationSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
 confirmpassword: { type: String },
  createdAt: { type: Date, default: Date.now },
  otp: { type: Number },
  name: { type: String},

  contactnumber: { type: Number },


  role: { type: String, enum: ["user", "agency", "escort"] },
});
module.exports = mongoose.model("Registration", RegistrationSchema);
