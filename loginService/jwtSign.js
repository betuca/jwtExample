const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./secrets/private.key', 'utf8');

const signOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: "RS256"
};

const jwtSign = (user) => {
  const token = jwt.sign({user}, privateKey, signOptions);
  console.log("> token created: " + token)
  return token;
}

module.exports = { jwtSign };