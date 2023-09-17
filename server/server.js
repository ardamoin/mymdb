const express = require("express");
const cors = require("cors");
const db = require("./db");
const cookieParser = require("cookie-parser");

const app = express();

// Use the cors middleware to enable CORS for your server
const corsOptions = {
  origin: "http://localhost:3000", // Frontend address
  credentials: true,
};
app.use(cors(corsOptions));

// Use cookie-parser middleware to parse every cookie
app.use(cookieParser());

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
