const express = require("express");
const { jwtValidate } = require("./jwtValidate");
const {DELAY} = require("./constants");

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
  console.log("----------------------------");
  console.log("> Beginning load user data process");
  console.log("----------------------------");
  await new Promise(resolve => setTimeout(resolve, DELAY));

  const userId = req.params.userId;
  console.log("> (jwt valid) info request received for user: ", userId);
  await new Promise(resolve => setTimeout(resolve, DELAY));

  console.log("> Responding info request with user data.");
  await new Promise(resolve => setTimeout(resolve, DELAY));

  console.log("----------------------------");
  console.log("> load user data process finished!");
  console.log("----------------------------");
  res.json({ user: users[userId] });
});

app.listen(5002, () => {
  console.log("user service listening port 5002");
});
