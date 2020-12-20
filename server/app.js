const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 8080;
const passport = require("passport");
const bodyParser = require('body-parser');
const passportSetup = require("./config/passport");
//const session = require("express-session");
const authRoutes = require("./routes");
const secureRoute = require('./routes/secureRoutes');
const mongoose = require("mongoose");
const UserModel = require('./model/model');
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header

// mongoose.connect('mongodb://127.0.0.1:27017/travel-app', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })

mongoose.connect('mongodb://127.0.0.1:27017/travel-app', () => {
  console.log("connected to mongo db");
});

app.use(
  cookieSession({
    name: "session",
    keys: "thisappisawesome",
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));