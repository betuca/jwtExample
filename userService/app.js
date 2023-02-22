const express = require("express");

const app = express();

app.listen(5002, () => {
  console.log("user service listening port 5002");
});
