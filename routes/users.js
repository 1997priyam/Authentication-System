var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { validateEmail } = require('../utils/utils');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  try{
    let { name, email, password } = req.body;
    let role = 'user', createdUser;
    if(!name || !email || !password) return res.status(400).json({error: 'Invalid params!'});
    if(!validateEmail(email)) return res.status(403).json({error: 'Invalid Email!'});
    if(password.length < 6) return res.status(403).json({error: 'Password length is less than 6 chars!'});
    let user = await userModel.findOne({email});
    if(user) return res.status(403).json({error: 'User with this email already exists!'});
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        createdUser = await userModel.create({email, name, password: hash, role});
      });
    });
    return res.status(200).json(createdUser);
  } catch(e) {
    return res.status(500).json({error: 'Server error !'})
  } 
});

module.exports = router;
