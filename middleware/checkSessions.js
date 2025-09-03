const checkSessions = async (req, res, next) => {

  console.log("working in sessions!")

  if (req.isAuthenticated()) {
console.log("Authenticated!!");
    next(); 
  } else  {
    console.log("Non-Authenticated");
    res.status(403).json({message:"unauthorised!!"})
  }
};
module.exports = checkSessions;       