var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { validateEmail } = require('../utils/utils');
const { getToken } = require('../utils/authUtils');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res) {
  try { 
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({error: 'Invalid Params!'});
    if (!validateEmail(email)) return res.status(403).json({error: 'Invalid Email!'});
    let user = await userModel.findOne({email});
    if (!user) return res.status(403).json({error: 'User not registered'});
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let tokenPayload = {
          email: user.email,
          name: user.name,
          role: user.role
        };
        tokenPayload.token = getToken(tokenPayload);
        res.status(200).json(tokenPayload);
      } else {
        res.status(403).json({error: 'Incorrect Password'});
      }
    });
    return;
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: 'Server Error!'});
  }
});

module.exports = router;
