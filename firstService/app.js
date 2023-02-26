const express = require("express");
const axios = require("axios");

const app = express();

const LOCAL_HOST = "http://localhost";
const LOGIN_HOST = LOCAL_HOST + ":5000";
const USER_HOST = LOCAL_HOST + ":5002";


const header = (token) => {
  return {
    headers: {
      authorization: "Bearer " + token,
    }
  }
}

app.get("/load", async  (req, res) => {
  // res.json({message: "load endpoint"});

  const loginPayload = {
    login: "andrea",
    password: "harry"
  }

  let token;

  await axios.post(LOGIN_HOST + '/login', loginPayload)
  .then((response) => {
    // console.log(response.data);
    token = response.data.token;
  })
  .catch((error) => {
    console.log("we've got an error: ", error);
  })

  let data;
  axios.get(USER_HOST + "/user/1", header(token))
  .then((response) => {
    console.log("response: ", response.data)
    data = response.data
  })
  .catch((error) => {
    console.log("user service error: ", error)
  });

  res.json({message: data});

})

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
