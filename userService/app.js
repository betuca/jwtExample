const express = require("express");
const { validateJwt } = require("./validateJwt");

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

app.get("/user/:userId", validateJwt, (req, res) => {
  const userId = req.params.userId;
  console.log("retrieve info for user: ", userId);
  res.json({ user: users[userId] });
});

app.listen(5002, () => {
  console.log("user service listening port 5002");
});
