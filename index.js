require("dotenv").config();
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const app = express()
const session = require("express-session");
const User = require("./Models/Users")
const authRoutes = require("./routes/authenticate.routes")
const jobRoutes = require("./routes/jobs.routes");
const checkSessions = require("./middleware/checkSessions");

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:5173',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  credentials: true, 
};

app.use(cors(corsOptions));

// connect to the database 
require("./config/DatabaseConfig")();
require("./config/passPortConfig")(passport)

// SESSIONS RELATED 
app.use(
  session({
    secret: "DUMMY_SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: false // true only if using HTTPS
    }
  })
);

// PASSPORT CONFIG  
app.use(passport.initialize());
app.use(passport.session());


// ROUTES 
app.use("/auth", authRoutes) 
app.use(checkSessions);
app.use("/job", jobRoutes)














// START SERVER
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at ${port}.`)
}); 