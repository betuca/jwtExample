const express = require("express");
const bodyParser = require("body-parser");
const { validateLogin } = require("./validateLogin.js");
const { jwtSign } = require("./jwtSign");
const {DELAY, printAndWaitWithBorders, printAndWait, printWithBorders} = require("./constants");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  await printAndWaitWithBorders("Beginning login process");

  const login = req.body.login;
  const password = req.body.password;

  await printAndWait("login request received for user: " + login + " and password: " + password);

  if (validateLogin(login, password)) {
    await printAndWait("login valid. Creating token.");

    const token = jwtSign(login);

    await printAndWait("Responding request with token.");

    printWithBorders("login process finished!");

    res.json({
      message: "login valid",
      token
    });
  } else {
    console.log("> invalid login / password");
    printWithBorders("login process finished!");
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
