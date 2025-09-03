const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const User = require("../Models/Users.js")
const passport = require("passport")

module.exports = (passport) => {
    passport.use("sign-up",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
            async (req, username, password, done) => {
                try { 
                    const user = await User.findOne({ username })
                    if (user) {
                        console.log("username", username, "already exists.")
                        return done(null, false, { message: "username exists." })
                    }
                    if (!username || !password){
                        console.log("Not Enough Info.")
                    }
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt)
                    const newUser = await User.create({
                        username: username,
                        password: hashedPassword
                    })
                    console.log("New user created", newUser.username)
                    return done(null, newUser) 
                    console.log(newUser)
                } catch (err) {
                    console.log("Error - user creation", err.message)
                    return done(err.message)
                }
            }
        )
    )

    passport.use("login",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        },
            async (username, password, done) => { 
                try {
                    const existingUser = await User.findOne({ username }) 
                    if (!existingUser) {
                        console.log("Incorrect username or password")
                        return done(null, false, { message: "Incorrect username " })
                    }
                     
                    const isMatch = await bcrypt.compare(password, existingUser.password)
                    if (!isMatch) {
                        console.log("Wrong password")
                        return done(null, false, { message: "Incorrect password" })

                    }
                    if (isMatch)  return done(null, existingUser)
                }
                catch {
                    (error) => {
                        console.log("Error while logging in")
                        return done(error)
                    }
                }
            }
        )
    )
} 

passport.serializeUser((user, done) => {
  done(null, user._id);  
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});