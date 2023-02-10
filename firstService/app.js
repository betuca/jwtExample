const express = require("express");
const axios = require("axios");

const app = express();

const LOCAL_HOST = "http://localhost";
const LOGIN_HOST = LOCAL_HOST + ":5000";
const USER_HOST = LOCAL_HOST + ":5002";

app.get("/load", async (req, res) => {
  console.log("> login");

  await axios
    .post(LOGIN_HOST + "/login", {
      login: "betuca",
      password: "12345",
    })
    .then((response) => {
      console.log(response.data);
      const token = response.data.token;
      console.log("token received: ", token);
    })
    .catch((error) => {
      console.log(error.message);
    });

  res.json({ message: "nothing loaded yet!" });
});

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
