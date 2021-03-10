const Review = require("../models/reviewModel.js");
exports.reviewuser = async function (req, res) {
     const user = await Review.create(req.body);
     res.status(200).json({
       status: "success",
       data: user,
     });
};
     exports.fetchreview = async (req, res, next) => {
       const getData = await Review.find({userid: req.body.userid});
       res.status(200).json({
         status: "success",
         results: getData.length,
         data: getData.ratings,
       });
     };
