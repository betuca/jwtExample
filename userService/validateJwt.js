const validateJwt = (req, res, next) => {
  console.log("on validateJwt middleware")
  const authHeader = req.headers['authorization'];
  console.log("authHeader: ", authHeader);
  next();
}

module.exports = { validateJwt };