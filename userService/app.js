const express = require("express");
const { jwtValidate } = require("./jwtValidate");
const {DELAY, printWithBorders, printAndWaitWithBorders, printAndWait} = require("./constants");

const app = express();

const users = {
  1: {
    name: "some name",
    email: "some-email@gmail.com"
  },
  2: {
    name: "another name",
    email: "another-email@gmail.com"
  },
  3: {
    name: "yet another name",
    email: "yet-another-email@gmail.com"
  }
}

app.get("/user/:userId", jwtValidate, async (req, res) => {
  printAndWaitWithBorders("Beginning load user data process");

  const userId = req.params.userId;
  await printAndWait("(jwt valid) info request received for user: " + userId);

  await printAndWait("Responding info request with user data.");

  printWithBorders("load user data process finished!");
  res.json({ user: users[userId] });
});

app.listen(5002, () => {
  console.log("user service listening port 5002");
});
