const Escort = require("../models/escort.js");
const catchAsync = require("../utils/catchAsync");
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const PORT = 3001;

exports.bookescort =async (req,res,next)=>{
                const book = await Escort.create(req.body)
                res.status(200).json({
                    status:"success",
                    data:book
                })
            }
            exports.deleteescort=function(req,res){
                    console.log(req.params)
                    Escort.deleteOne({_id:req.params.id}).then((result)=>{
                        res.status(200).json(result)
                    }).catch((err)=>{console.warn(err)})
               }
               exports.insertescortpicture =  catchAsync(
                 async (req, res, next) => {
                   let images = [];
                   console.log(req.params.id);
                  // console.log(req.body.image.length);
                   for (var i in req.body.image) {
                     console.log(i);
                     let date = new Date().toLocaleString();
                     let dataString = date.replace(" ", "-");
                     let dateupdate = dataString.replace(" ", "-");
                     var matches = await req.body.image[i].match(
                         /^data:([A-Za-z-+\/]+);base64,(.+)$/
                       ),
                       response = {};
                     if (matches.length !== 3) {
                       return new Error("Invalid input string");
                     }
                     response.type = matches[1];
                     response.data = new Buffer.from(matches[2], "base64");
                     let decodedImg = response;
                     let imageBuffer = decodedImg.data;
                     let type = decodedImg.type;

                     const name = type.split("/");
                     const name1 = name[0];
                     let extension = mime.getExtension(type);
                     const rand = Math.ceil(Math.random() * 1000);
                     //Random photo name with timeStamp so it will not overide previous images.
                     const fileName = `photo_${Date.now()}.${extension}`;
                     path3 = path.resolve(`./public/images`);
                     const localpath = `${path3}/photo/`;
                     if (!fs.existsSync(localpath)) {
                       fs.mkdirSync(localpath, { recursive: true });
                     }
                     fs.writeFileSync(
                       `${localpath}` + fileName,
                       imageBuffer,
                       "utf8"
                     );
                     const url = `${req.protocol}://${req.hostname}:${PORT}/images/photo/${fileName}`;
                     console.log(url);
                     images.push(url);
                   }
                   const updating = await Escort.findByIdAndUpdate(
                     { _id: req.params.id },
                     {
                       $set: { image: images },
                     }
                   );
                   console.log(images);
                   // console.log(updating);
                   return res.status(200).json({
                     status: "success",
                   });
                 }
               );
               exports.verified = catchAsync(async (req, res, next) => {
                 console.log(req.params.id);
                 let date = new Date().toLocaleString();
                 let dataString = date.replace(" ", "-");
                 let dateupdate = dataString.replace(" ", "-");
                 var matches = await req.body.proof.match(
                     /^data:([A-Za-z-+\/]+);base64,(.+)$/
                   ),
                   response = {};
                 if (matches.length !== 3) {
                   return new Error("Invalid input string");
                 }
                 response.type = matches[1];
                 response.data = new Buffer.from(matches[2], "base64");
                 let decodedImg = response;
                 let imageBuffer = decodedImg.data;
                 let type = decodedImg.type;
                 const name = type.split("/");
                 const name1 = name[0];
                 let extension = mime.getExtension(type);
                 const rand = Math.ceil(Math.random() * 1000);
                 //Random photo name with timeStamp so it will not overide previous images.
                 const fileName = `photo_${Date.now()}.${extension}`;
                 path3 = path.resolve(`./public/images`);
                 const localpath = `${path3}/photo/`;
                 if (!fs.existsSync(localpath)) {
                   fs.mkdirSync(localpath, { recursive: true });
                 }
                 fs.writeFileSync(
                   `${localpath}` + fileName,
                   imageBuffer,
                   "utf8"
                 );
                 const url = `${req.protocol}://${req.hostname}:${PORT}/images/photo/${fileName}`;
                 console.log(url);
                 const updating = await Escort.findByIdAndUpdate(
                   { _id: req.params.id },
                   {
                     $set: { proof: url },
                   }
                 );
                 // console.log(updating);
                 return res.status(200).json({
                   status: "success",
                 });
               });
               exports.forgetpassword = async function (req, res) {
                   
                   if(req.body.password===req.body.confirmpassword)
                {
                   let newPassword = req.body.password.toString();

                  bcryptpassword = await bcrypt.hash(newPassword, 12);
                  console.log(bcryptpassword);
                   Escort.findByIdAndUpdate(
                   { _id: req.params.id },

                   { $set: { password: bcryptpassword } }
                   )
                    .then((result) => {
                     res.status(200).json(result);
                    
                  })
                }

                 console.warn("password does not match");
                   
               };
               exports.update=function(req,res){
                 console.log(req.body.escortname)
                    Escort.findByIdAndUpdate(
                        {
                            _id:req.params.id},
                            {$set:{
                                escortname:req.body.escortname,
                            }}
                        
                    ).then((result)=>{
                        res.status(200).json(result)
                    }).catch((err)=>{console.warn(err)})
                }