const express = require("express")
const passPortConfig = require("../config/passPortConfig.js")
const checkSessions =  require("../middleware/checkSessions.js")
const router = express.Router()
const passport = require("passport")

router.route("/signup").post(async (req, res, next) => {
  passport.authenticate("sign-up", (err, user, info) => {
    if (err) {
      console.log("Got an error while signing up.");
      console.log(1)
      return res.status(400).json({ "message":info.message })
    }
    if (!user) {
      console.log(2)
      return res.status(501).json({ "message":info.message })
    }
    req.login(user, (error) => {
      if (error) {
        console.log("message:Error-login-signup") 
      console.log(3)
        
        return res.status(400).json({ "message": info.message })
      }
      console.log(4)
      return res.status(201).json({ success: true, data: user })
    }); 
  })(req, res, next);
})

router.route("/login").post(async (req, res, next)=>{ 
  passport.authenticate("login",(err, user, info)=>{
    if (err) {
      console.log("Login error:", err,"\n1");
      return res.status(500).json({ success: false, message: err });
    }
    if (!user) {
      console.log(2)
      return res.status(400).json({ success: false, message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        console.log("Login session error:", err);
        return res.status(500).json({ success: false, message: "Login failed" });
         
      }

      console.log("Logged in:", user.username);
      console.log(4);
      return res.status(200).json({ success: true, data: user });
    })
  })(req, res, next);
})

router.route("/logout").get(async (req, res) => {

  req.logout((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout failed" })
    res.json(201).json({ success: true, message: "Logout successfull." })
  })
})


router.route("/check-session").get(async (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
})

router.route("/checksession").get(checkSessions);
router.get("/session",(req,res)=>res.json({auth:req.isAuthenticated(),user:req.user||null}))
router.get("/redirect",(req,res)=> res.redirect("http://localhost:5173/login"));

module.exports = router 