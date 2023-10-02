const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const users = [
  {
    id: 1,
    username: 'alice',
    password: 'hashed_password',
  },
];

router.get('/', (req, res) => {
  res.render('login');
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', 
  failureRedirect: '/login',    
  failureFlash: true,           
}));
      


module.exports = router;