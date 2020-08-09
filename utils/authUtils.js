const jwt = require("jsonwebtoken");
const TOKEN_SECRET = 'priyam@123';
const EXPIRE_TIME = '300s';


module.exports = {
    getToken: (data) => {
        return jwt.sign(data, TOKEN_SECRET, {expiresIn: EXPIRE_TIME});
    },
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({error: 'Not Authorized'});
      
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
          if (err) return res.status(403).json({error: 'Invalid Token, Please login again!'});
          req.user = user;
          next();
        })
      },

    shouldBeAdmin: (req, res, next) => {
        if(req.user.role == 'admin') next();
        else return res.status(403).json({error: 'You are not authorized to access this API.'});
     },
     
    isLoggedIn: (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) req.isLoggedIn = false;
    
      jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) req.isLoggedIn = false;
        else {
          req.user = user;
          req.isLoggedIn = true;
        }
        next();
      })
    }
}