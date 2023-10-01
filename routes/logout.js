const express = require('express');
const router = express.Router();

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send('Cant logout')
        }

    res.send('lougout succes')
    })
});

module.exports = router ;