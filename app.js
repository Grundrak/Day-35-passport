const users = [
  {
    id: 1,
    username: 'alice',
    password: 'hashed_password',
  },
];
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
  secret: 'greedo', 
  resave: false,
  saveUninitialized: false,
}));
passport.use(passport.initialize());
passport.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
 
  passport.deserializeUser((id, done) => {
    db.users.findById(id, function (err, user) {
      if (err) return done(err); 
      done(null, user);
    });
  });
  

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


const registrationRoutes = require('./routes/registration');
app.use('/register', registrationRoutes);
const loginRoutes = require('./routes/login')
app.use('/login', loginRoutes);
const logoutRoutes = require('./routes/logout')
app.use('/logout', logoutRoutes);
const protectedRoutes = require('./routes/protected');
app.use('/protected', protectedRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });