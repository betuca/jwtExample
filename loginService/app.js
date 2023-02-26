const express = require("express");
const bodyParser = require("body-parser");
const {validateLogin} = require("./validateLogin")
const {jwtSign} = require("./jwtSign");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true,
    })
);

app.post("/login", (req, res) => {
  console.log("body: ", req.body);
  const login = req.body.login;
  const password = req.body.password;

  if (!validateLogin(login, password)) {
    res.sendStatus(401);
  }

  const token = jwtSign(login);

  res.json({
    message: "login endpoint for: " + login,
    token: token
  })
})

app.listen(5000, () => {
  console.log("> login service listening port 5000!");
});
