const express = require("express");
const axios = require("axios");

const app = express();

const LOCAL_HOST = "http://localhost";
const LOGIN_HOST = LOCAL_HOST + ":5000";
const USER_HOST = LOCAL_HOST + ":5002";

const config = (value) => {
  return {
    headers: {
      authorization: value,
    }
  }
};

app.get("/load", async (req, res) => {
  console.log("> login");
  let token;
  await axios.post(LOGIN_HOST + "/login", {
    login: "betuca",
    password: "12345",
  })
  .then((response) => {
    console.log(response.data);
    token = response.data.token;
    console.log("token received: ", token);
  })
  .catch((error) => {
    console.log(error.message);
  });

  const authToken = "Bearer " + token;
  await axios.get(USER_HOST + "/user/1", config(authToken))
  .then((response) => {
    console.log(response.data);
  })
  .catch((error)=>{
    console.log(error.message);
  })

  res.json({message: "nothing loaded yet!"});
});

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
