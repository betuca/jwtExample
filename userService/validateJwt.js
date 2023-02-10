const validateJwt = (req, res, next) => {
  console.log("on validateJwt middleware")
  const authHeader = req.headers['authorization'];
  console.log("authHeader: ", authHeader);
  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1];
    console.log("token: ", token);


    next();
  } else {
    res.sendStatus(401)
  }
}

module.exports = { validateJwt };