const express = require("express");

const app = express();

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
