const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  //console.log(req.user);
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  console.log('here');
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  function (req, res) {
    res.json({ username: req.user });
  });

module.exports = router;