const Agent = require("../models/agentModel.js");
exports.bookescort = async (req, res, next) => {
  const book = await Escort.create(req.body);
  res.status(200).json({
    status: "success",
    data: book,
  });
};
