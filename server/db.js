const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({
  path: "./.env",
});

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST, //put ip address for mysql server when in production
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: 8889,
});

module.exports = db;
