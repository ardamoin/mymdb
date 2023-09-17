const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();

// Use the cors middleware to enable CORS for your server
app.use(cors());

const authRouter = require("./routes/auth");


db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected...");
  }
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
