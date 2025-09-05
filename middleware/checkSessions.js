
require("dotenv").config()
const jwt = require("jsonwebtoken")
const {getJWT, verifyJWT} = require("../config/JWT_opetations")

const verifySessions = async (req, res, next) => {
  console.log("working in sessions!")
  const token  = req.cookies.token;
  if(!token){
    return res.status(402).json({verified:false, message:"token not provided!"})
  }

 const  verified =   verifyJWT(token, process.env.SESSION_SECRET)

  if (verified){
    res.status(200).json({verified:true, user:verified})
  }else{
    res.status(403).json({verified:false, message:"Not Verified"})
  }
  
};
const validateSessions = async (req, res, next) => {
  console.log("working in sessions validations!");

  const token  = req.cookies.token;
  if(!token){
    return res.status(402).json({verified:false, message:"token not provided!"})
  }
  
 const verified =   verifyJWT(token, process.env.SESSION_SECRET)
  if (verified){
    req.user  = verified    
    return next()
  }else{
    res.status(403).json({verified:false, message:"Not Verified"})
  }
};

module.exports =  {validateSessions, verifySessions}