const users = [
  {
    username: 'alice',
    password: 'hashed_password',
  },

];

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('registration', req.query);
      });


      router.post('/submit', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const hashedPass = await bcrypt.hash(password ,10)
        users.push({username, password: hashedPass});
        res.render('registration-success', { username });
      });







module.exports = router;