require("dotenv").config()
const jwt  =  require("jsonwebtoken")

// GET JWT TOKEN 
const getJWT = (data) => {
  return jwt.sign(data, process.env.SESSION_SECRET, { expiresIn: 1800 })
}

// VERIFY JWT TOKEN 
const verifyJWT = (token) => {
  try {
    decoded = jwt.verify(token, process.env.SESSION_SECRET)
    return decoded
  }
  catch (err) {
    console.log("Error", err.message)
    return null
  }

}

module.exports = {getJWT, verifyJWT};
