const express = require("express");

const app = express();

app.get("/login", (req, res) => {
  console.log("loging");
  res.json({
    message: "loging in",
  });
});

app.listen(5000, () => {
  console.log("login service listening port 5000!");
});
