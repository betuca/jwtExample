const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  console.log("first I have to validate");
  res.json({ message: "nothing loaded yet!" });
});

app.listen(5002, () => {
  console.log("user service listening port 5002");
});
