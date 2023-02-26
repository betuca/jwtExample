const fs = require('fs');
const jwt = require('jsonwebtoken');

const publicKey = fs.readFileSync('./secrets/public.key', 'utf8');

const verifyOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: ["RS256"]
};

const jwtValidate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];
  console.log(token);

  const validationResult = jwt.verify(token, publicKey, verifyOptions);
  console.log("validation result: ", validationResult);

  next();
}

module.exports = { jwtValidate };