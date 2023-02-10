const express = require("express");
const bodyParser = require("body-parser");
const { validateLogin } = require("./validateLogin.js");
const { jwtSign } = require("./jwtSign");
const {DELAY} = require("./constants");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  console.log("----------------------------");
  console.log("> Beginning login process");
  console.log("----------------------------");
  await new Promise(resolve => setTimeout(resolve, DELAY));

  const login = req.body.login;
  const password = req.body.password;

  console.log("> login request received for user: ", login, " and password: ", password);
  await new Promise(resolve => setTimeout(resolve, DELAY));

  if (validateLogin(login, password)) {
    console.log("> login valid. Creating token.");
    await new Promise(resolve => setTimeout(resolve, DELAY));

    const token = jwtSign(login);

    console.log("> Responding request with token.");
    await new Promise(resolve => setTimeout(resolve, DELAY));

    console.log("----------------------------");
    console.log("> login process finished!");
    console.log("----------------------------");

    res.json({
      message: "login valid",
      token
    });
  } else {
    console.log("> invalid login / password");
    console.log("----------------------------");
    console.log("> login process finished!");
    console.log("----------------------------");
    await new Promise(resolve => setTimeout(resolve, DELAY));

    res.sendStatus(401);
  }
});

app.get('/oauth/token_keys', ()=>{
  res
})

app.listen(5000, () => {
  console.log("> login service listening port 5000!");
});
