const express = require('express');
const router = express.Router();
const passport = require('passport');

  router.get('/profile', passport.authenticate('local'), (req, res) => {
  res.send(`Welcome to your profile, ${req.user.username}!`);
});
module.exports = router;