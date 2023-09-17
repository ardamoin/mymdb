const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { createToken, validateToken } = require("../jwt");

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
        return res.status(400).json({ message: "Email already in use" });
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
          const newUserId = result.insertId;

          if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" }); // Handle the database error
          } else {
            console.log(result);

            const accessToken = createToken({
              id: newUserId,
              email: email,
              username: username,
            });

            res.cookie("access-token", accessToken, {
              maxAge: 60 * 60 * 24 * 30 * 1000,
            });

            return res.status(200).json({ message: "User registered" });
          }
        }
      );
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" }); // Handle the database error
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
      // Handle no users were found
    }

    const user = result[0];
    const passswordFromDb = user.password;

    bcrypt.compare(password, passswordFromDb).then((match) => {
      if (!match) {
        return res.status(400).json({ message: "Incorrect password" });
      } else {
        const accessToken = createToken(user);

        res.cookie("access-token", accessToken, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
        });

        return res.status(200).json({ message: "logged in" });
      }
    });
  });
};
