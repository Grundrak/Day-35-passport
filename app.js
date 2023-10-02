const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

// Initialize an empty array to store user data (you may use a database later)
let users = [
    {
        id: 1,
        username: 'greedo',
        password: 'tata', // Replace with hashed password
    },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'greedo66kio',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("Deserializing for id:", id);
    const user = users.find(u => u.id === id);
    if (!user) {
        console.log("User not found during deserialization");
        return done("User not found");
    }
    done(null, user);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
      const user = users.find(u => u.username === username);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
              console.error("Error comparing passwords:", err);
              return done(err);
          }
          if (isMatch) {
              console.log("Passwords match for user:", username);
              return done(null, user);
          } else {
              console.log("Passwords do not match for user:", username);
              return done(null, false);
          }
      });
  }
));


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("registration");
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Error:", err);
            return next(err);
        }
        if (!user) {
            console.log("Authentication failed:", info ? info.message : 'No additional info provided');
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error("Session error:", err);
                return next(err);
            }

            return res.redirect("/dashboard");
        });

    })(req, res, next);
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, username, password: hashedPassword };
        users.push(newUser);
        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.render("dashboard", { user: req.user });
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
