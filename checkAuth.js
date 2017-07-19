var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

function checkAuth(req,res, next){
  var token = req.headers("x-access-token");

  if(!token){
    return res.status(401).send("Unauthorized user. Token Missing.");
  }

  jwt.verify(token, jwtConfig.secret, function(err, tokenData) {
    if(err){
      return res.status(400).send("Nope.");
    }
    req.user = tokenData.user;
    return next();
  });
};
