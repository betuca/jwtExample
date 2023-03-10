const express = require("express");
const axios = require("axios");
const {DELAY, printAndWaitWithBorders, printWithBorders} = require("./constants");

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
  await printAndWaitWithBorders("Beginning loading process");

  await printAndWaitWithBorders("sending login request");

  let token;
  let errorFlow = false;
  await axios.post(LOGIN_HOST + "/login", {
    login: "andrea",
    password: "harry",
  })
  .then((response) => {
    // console.log(response.data);
    token = response.data.token;
    console.log("> token received: ", token);
  })
  .catch((error) => {
    printWithBorders("Loading process FAILED! :(");
    console.log(error.message);
    errorFlow = true;
  });

  if (errorFlow) {
    res.json({message: "failed to login"});
    return;
  }

  let responseData;
  const authToken = "Bearer " + token;
  console.log("> sending user info request");
  await new Promise(resolve => setTimeout(resolve, DELAY));
  await axios.get(USER_HOST + "/user/3", config(authToken))
  .then((response) => {
    console.log("> user info received: ", response.data);
    responseData = response.data;
  })
  .catch((error)=>{
    console.log(error.message);
    res.sendStatus(500);
  })

  printWithBorders("Loading process finished!");
  res.json({message: responseData});
});

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
