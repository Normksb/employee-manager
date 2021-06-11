require("dotenv").config();
require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});