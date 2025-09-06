const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const Admin = require("../Models/Admin.js");
const User = require("../Models/Users.js");
const passport = require("passport")

module.exports = (passport) => {
    passport.use("admin_signup",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
            async (req, username, password, done) => {
                try {
                    const user = await Admin.findOne({ username })
                    if (!username || !password) {
                        console.log("Not Enough Info.")
                    }
                    if (user) {
                        console.log("Admin", username, "already exists.")
                        return done(null, false, { message: "username exists." })
                    }
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt)
                    const newUser = await Admin.create({
                        username: username,
                        password: hashedPassword
                    })
                    console.log("New user created", newUser.username)
                    return done(null, newUser)
                } catch (err) {
                    console.log("Error - user creation", err.message)
                    return done(err.message)
                }
            }
        )
    )

    passport.use("admin_login",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        },
            async (username, password, done) => {
                try {
                    const existingUser = await Admin.findOne({ username })
                    if (!existingUser) {
                        console.log("Incorrect username or password")
                        return done(null, false, { message: "Incorrect username " })
                    }

                    const isMatch = await bcrypt.compare(password, existingUser.password)
                    if (!isMatch) {
                        console.log("Wrong password")
                        return done(null, false, { message: "Incorrect password" })
                    }
                    if (isMatch) return done(null, existingUser)
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
    passport.use("user_signup",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
            async function (req, username, password, done) {
                try {
                    // CHECK IF ALL THE FIELDS ARE PROVIDED  
                    if (!username || !password) {
                        return done(null, false, { message: "All fields required" })
                    }

                    // CHECK IF USER EXISTS
                    const user = await User.findOne({ username })
                    console.log("user",user);
                    if (user) {
                        return done(null, false, { message: "User Already Exists" })
                    }
                    // HASH AND SAVE
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt);

                    const createdUser = await User.create({ username, password: hashedPassword })
                    return done(null, createdUser)
                } catch (error) {
                    console.log("Error-user", error.message);
                    done(error);
                }
            }
        )
    )
    passport.use("user_login",
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password", 
        },
            async function (  username, password, done) {
                try {

                    // CHECK IF ALL FIELDS PROVIDED 
                    if (!username || !password) {
                        done(null, false, { message: "All fields required." })
                    }

                    // CHECK IF USER EXISTS 
                    const user = await User.findOne({ username });
                    if (!user) {
                        console.log(username, "doesn't exist.");
                        return done(null, false, { message: "user doesn't exist." })
                    }

                    const isMatched = await bcrypt.compare(password, user.password);
                    if (isMatched) {
                        console.log("user", user.username, "logged in")
                        return done(null, user)
                    }
                    return done(null, false, { message: "Worng password" });

                }
                catch (err) {
                    console.log("Error-user-login", err.message);
                    return done(err);
                }
            }
        ))
} 
