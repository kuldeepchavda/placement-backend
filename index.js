require("dotenv").config();
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const app = express()
const session = require("express-session");
const User = require("./Models/Users.js")
const authRoutes = require("./routes/authenticate.routes.js")
const jobRoutes = require("./routes/jobs.routes.js");
const checkSessions = require("./middleware/checkSessions.js");
console.log(1)

app.use(express.json())
console.log(2)

const corsOptions = {
  origin: ['http://localhost:5173', 'https://placement-frontend-3sp7.onrender.com'],
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
};
console.log(3)

app.use(cors(corsOptions));

console.log(4)
// app.options('/*', cors(corsOptions));


// connect to the database 
require("./config/DatabaseConfig")();
require("./config/passPortConfig")(passport)
// SESSIONS RELATED 
const MongoStore = require("connect-mongo");
// Session setup
// server app.set("trust proxy", 1); // VERY IMPORTANT on Render

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    httpOnly: true,
    secure: true,     // only send over HTTPS
    sameSite: "none", // allow cross-site cookies
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}));


// local
// app.use(
//   session({
//     secret: "DUMMY_SECRET_KEY",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60, // 1 hour
//       httpOnly: true,
//       secure: false // true only if using HTTPS
//     }
//   })
// );
console.log(5)
// PASSPORT CONFIG  
app.use(passport.initialize());
app.use(passport.session());

console.log(6)
// ROUTES 
app.use("/auth", authRoutes) 
app.use(checkSessions);
app.use("/job", jobRoutes)




console.log(7)










// START SERVER
const port = 5000;
app.listen(port, () => {
  console.log(`Server running at ${process.env.PORT}.`)
});