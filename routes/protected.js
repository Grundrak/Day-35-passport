const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    if (!req.session.user) {
      return res.send('Access denied. Please log in.');
    }
    res.send(`Welcome to your profile, ${req.session.user.username}!`);
  });
  
module.exports = router;