const mongoose = require("mongoose");
const AgentSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },

  createdAt: { type: Date, default: Date.now },
  agencyname: { type: String },
  ownername: { type: String },
  countryname: { type: String },
  cityname: { type: String },
  
  setpercentage: { type: Number },
});
module.exports = mongoose.model("Agent", AgentSchema);
