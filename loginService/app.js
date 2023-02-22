const express = require("express");

const app = express();

app.listen(5000, () => {
  console.log("> login service listening port 5000!");
});
