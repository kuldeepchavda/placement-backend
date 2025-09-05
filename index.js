require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");


// ROUTES
const authRoutes = require("./routes/authenticate.routes.js")
const jobRoutes = require("./routes/jobs.routes.js");
const {validateSessions} = require("./middleware/checkSessions.js");


// APP INITIATION 
const app = express()


//MIDDLEWARE
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: ['http://localhost:5173', 'https://placement-frontend-3sp7.onrender.com','https://placement-frontend-sepia.vercel.app'],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));


require("./config/DatabaseConfig")();
require("./config/passPortConfig")(passport)

// PASSPORT CONFIG  
app.use(passport.initialize());
// app.use(passport.session());

// ROUTES 
app.use("/auth", authRoutes) 
app.use(validateSessions);
app.use("/job", jobRoutes)

// START SERVER
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at ${process.env.PORT}.`)
});
console.log(1)
console.log(2)
console.log(3)
console.log(4)
console.log(5)
console.log(6)
console.log(7)