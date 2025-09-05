const express = require("express")
const passPortConfig = require("../config/passPortConfig.js")
const {validateSessions, verifySessions}  = require("../middleware/checkSessions.js")
const router = express.Router()
const passport = require("passport")
const { getJWT } = require("../config/JWT_opetations.js")


router.route("/signup").post(async (req, res, next) => {
  passport.authenticate("sign-up", (err, user, info) => { 
    if (err) {
      console.log("Got an error while signing up.");
      console.log(1)
      return res.status(400).json({ "message": info.message })
    }
    if (!user) {
      console.log(2)
      return res.status(501).json({ "message": info.message })
    }
    const generatedToken = getJWT({ username: user.username, id: user._id })
    res.cookie("token", generatedToken)
    res.status(201).json({ message: "Signed up." })
  })(req, res, next);
});

router.route("/login").post(async (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.log("Login error:", err, "\n1");
      return res.status(500).json({ success: false, message: err });
    }
    if (!user) {
      console.log(2)
      return res.status(400).json({ success: false, message: info.message });
    }


    res.cookie("token", getJWT({ username: user.username, id: user._id }))
    res.status(201).json({ message: "Logged in" });


  })(req, res, next);
})

 

router.route("/logout").get( (req, res) => {
  try {
    res.clearCookie("token")
    res.status(201).json({ message: "Logged out successfully." })
  } catch (error) {
    console.log(error.message)
    res.send("hey")
  }
})

router.route("/checksession").get(verifySessions);
module.exports = router 