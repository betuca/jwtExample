const fs = require('fs');
const jwt = require('jsonwebtoken');
const {DELAY} = require("./constants");

const publicKey = fs.readFileSync('./secrets/public.key', 'utf8');

const verifyOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: ["RS256"]
};

const jwtValidate = async (req, res, next) => {
  console.log("> (middleware) info request received");
  await new Promise(resolve => setTimeout(resolve, DELAY));

  const authHeader = req.headers['authorization'];
  console.log("> authHeader: ", authHeader);
  await new Promise(resolve => setTimeout(resolve, DELAY));

  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1];
    console.log("> token from request: ", token);
    await new Promise(resolve => setTimeout(resolve, DELAY));
    try {
      console.log("> verifying JWT");
      await new Promise(resolve => setTimeout(resolve, DELAY));

      const validationResult = jwt.verify(token, publicKey, verifyOptions);
      console.log("> JWT verification result: " + JSON.stringify(validationResult));

    } catch (err) {
      console.log("> JWT verification ERRO! ", err);
      return false;
    }
    next();
  } else {
    res.sendStatus(401)
  }
}

module.exports = {jwtValidate};