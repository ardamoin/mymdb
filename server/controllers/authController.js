const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

exports.register = (req, res) => {
  console.log(req.body);

  const { email, username, password } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" }); // Handle the database error
      }

      if (result.length > 0) {
        return res.status(409).json({ message: "Email already in use" });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          username: username,
          email: email,
          password: hashedPassword,
        },
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" }); // Handle the database error
          } else {
            console.log(result);
            return res.status(200).json({ message: "User registered" });
          }
        }
      );
    }
  );
};
