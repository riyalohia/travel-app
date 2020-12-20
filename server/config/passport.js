const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const configAuth = require('./auth');
const passport = require("passport");
const UserModel = require('../model/model')

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: 'User not found' });

        const validate = await user.isValidPassword(password);
        if (!validate) return done(null, false, { message: 'Wrong password' });

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        done(error);
      }
    }
  )
)

passport.use(new GoogleStrategy({

  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,

},
  (token, refreshToken, profile, done) => {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    const user = profile.displayName;
    done(null, user);

  }));

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }

  )
)