const mongoose = require("mongoose");
const BookingSchema = mongoose.Schema({
  city: { type: String },
  gender: { type: String },
  place: { type: String },
  Date: { type: Date },
  time: { type: Number },
  Duration: { type: Number },
  agency: { type: String },
  age: { type: Number },
  height: { type: Number },
  bodytype: { type: String },
  service: { type: String },
  image: { type: Array },
  proof: { type: String },
  password: { type: String },
  escortname: { type: String },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Booking", BookingSchema);
