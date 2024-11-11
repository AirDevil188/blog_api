const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../db/queries");
const dotenv = require("dotenv");

dotenv.config();

const passportLocalStrategy = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.findUser(username);

        if (!user) {
          return done(null, false, { message: "Incorrect username!" });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect password!" });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    })
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.deserializeUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const passportJWTStrategy = () => {
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        return done(null, { user: jwt_payload.user, role: jwt_payload.role });
      } catch (err) {
        console.log(err);
        return done(err);
      }
    })
  );
};

passportLocalStrategy();
passportJWTStrategy();
