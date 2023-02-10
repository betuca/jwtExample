const express = require("express");
const bodyParser = require("body-parser");
const { validateLogin } = require("./validateLogin.js");
const { jwtSign } = require("./jwtSign");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.post("/login", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  console.log("> user: ", login, " loging in with password: ", password);
  if (validateLogin(login, password)) {
    console.log("valid login");
    const token = jwtSign(login);
    res.json({
      message: "valid login",
      token
    });
  } else {
    console.log("invalid login / password");
    res.sendStatus(401);
  }
});

app.listen(5000, () => {
  console.log("login service listening port 5000!");
});
