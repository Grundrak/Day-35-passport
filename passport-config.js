const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(passport.initialize());
passport.use(passport.session())



passport.use(new LocalStrategy(
    function(username, password, done) {
      db.users.findByUsername(username, (err,user) =>{
        if(err) return done(err);
        if(!user) return done(null, false);
        if(user.password != password) return done(null, false);
        return done(null, user);
      });
    }
  ))














module.exports = passport;