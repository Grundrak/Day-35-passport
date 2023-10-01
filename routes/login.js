const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = [
    {
      username: 'alice',
      password: 'hashed_password',
    },
  
  ];
router.get('/', (req, res) => {
    res.render('login' ,req.query);
      });


router.post('/login', async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => {user.username === username})
    if(!user){
        return res.send('User not found')
    }
    const passMatch = await bcrypt.compare(password , user.password);

    if(passMatch){
        req.session.user = user;
           res.render('Welcome to you ', { username });
    } else {
      res.send('Invalid username or password.');
    }
    }
)


module.exports = router;