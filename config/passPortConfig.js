const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const Admin = require("../Models/Admin.js");
const User = require("../Models/user/Users.js");
const passport = require("passport")

module.exports = (passport) => {
    passport.use("admin_signup",
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
            async (req, email, password, done) => {
                try {
                    const user = await Admin.findOne({ email })
                    if (!email || !password) {
                        console.log("Not Enough Info.")
                    }
                    if (user) {
                        console.log("Admin", email, "already exists.")
                        return done(null, false, { message: "email exists." })
                    }
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt)
                    const newUser = await Admin.create({
                        email: email,
                        password: hashedPassword
                    })
                    console.log("New user created", newUser.email)
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
            usernameField: "email",
            passwordField: "password"
        },
            async (email, password, done) => {
                try {
                    const existingUser = await Admin.findOne({ email })
                    if (!existingUser) {
                        console.log("Incorrect email or password")
                        return done(null, false, { message: "Incorrect email " })
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
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
            async function (req, email, password, done) {
                try {
                    // CHECK IF ALL THE FIELDS ARE PROVIDED  
                    if (!email || !password) {
                        return done(null, false, { message: "All fields required" })
                    }

                    // CHECK IF USER EXISTS
                    const user = await User.findOne({ email })
                    console.log("user",user);
                    if (user) {
                        return done(null, false, { message: "User Already Exists" })
                    }
                    // HASH AND SAVE
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(password, salt);

                    const createdUser = await User.create({ email, password: hashedPassword })
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
            usernameField: "email",
            passwordField: "password", 
        },
            async function (  email, password, done) {
                try {
                    console.log(email, password);
                    console.log(0)
                    // CHECK IF ALL FIELDS PROVIDED 
                    if (!email || !password) {
                        done(null, false, { message: "All fields required." })
                    }
                    console.log(1)

                    // CHECK IF USER EXISTS 
                    const user = await User.findOne({ email });
                    console.log(user);
                    
                    if (!user) {
                        console.log(email, "doesn't exist.");
                        return done(null, false, { message: "user doesn't exist." })
                    }
                    console.log(3)

                    const isMatched = await bcrypt.compare(password, user.password);
                    if (isMatched) {
                        console.log("user", user.email, "logged in")
                        return done(null, user)
                    }
                    console.log(4)

                    return done(null, false, { message: "Worng password" });
                    console.log(5)

                }
                catch (err) {
                    console.log("Error-user-login", err.message);
                    return done(err);
                }
            }
        ))
} 
