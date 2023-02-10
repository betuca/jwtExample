const fs = require('fs');
const jwt = require('jsonwebtoken');

// PRIVATE and PUBLIC key
const privateKEY = fs.readFileSync('./secrets/private.key', 'utf8');
const publicKEY = fs.readFileSync('./secrets/public.key', 'utf8');

const signOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: "RS256"
};

const jwtSign = (user) => {
  console.log('Create JWT for: ', user)
  const token = jwt.sign({user}, privateKEY, signOptions);
  console.log("Token - " + token)
  return token;
}

module.exports = { jwtSign };