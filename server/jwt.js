const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});
const createToken = (user) => {
  const accessToken = sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ message: "User not authenticated" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next;
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { createToken, validateToken };
