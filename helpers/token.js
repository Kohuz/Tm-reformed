const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;


function generateAccessToken (name) {
    return jwt.sign(name, process.env.TOKEN_SECRET, { expiresIn: '20000s' });
  }


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }  

  module.exports = {generateAccessToken,authenticateToken};