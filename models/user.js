const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  name: { type: String },
  hotelname: { type: String },
  contactnumber: { type: Number },
  specialrequest: { type: String },
  ratings:{type:Number}
});
module.exports = mongoose.model("User", UserSchema);
