const fs = require('fs');
const jwt = require('jsonwebtoken');
const {DELAY, printAndWait} = require("./constants");

const publicKey = fs.readFileSync('./secrets/public.key', 'utf8');

const verifyOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: ["RS256"]
};

const jwtValidate = async (req, res, next) => {
  await printAndWait("(middleware) info request received");

  const authHeader = req.headers['authorization'];
  await printAndWait("authHeader: " + authHeader);

  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1];
    await printAndWait("token from request: ", token);
    try {
      await printAndWait("> verifying JWT");

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