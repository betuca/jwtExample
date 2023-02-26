
const jwt  = require('jsonwebtoken');
const fs   = require('fs');

const privateKey = fs.readFileSync('./secrets/private.key', 'utf8');

const signOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: "RS256"
};

const jwtSign = (user) => {
  //  jwt.sign(payload, privateKey, signOptions);

  return jwt.sign({user}, privateKey, signOptions);
}

module.exports = { jwtSign };