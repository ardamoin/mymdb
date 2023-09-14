const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "sample api response",
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
