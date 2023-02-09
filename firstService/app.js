const express = require("express");

const app = express();

app.get("/load", (req, res) => {
  console.log("first I have to login");
  res.json({ message: "nothing loaded yet!" });
});

app.listen(5001, () => {
  console.log("first service listening port 5001");
});
