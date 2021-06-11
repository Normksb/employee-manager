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


// starts the app, after completing each instance of add/update the restart function will bring us back here.
startEmployeeManager();


// initial inquirer prompts once the app starts
function startEmployeeManager() {
  _sp();
  inquirer.prompt([
    {
      type: "list",
      message:
        "Please choose from the following list to add, view or update departments, roles or employees.",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Roles",
        "Quit",
      ],
      name: "choice",
    },
  ])
  .then((answers) => {
    if (answers.choice === "Add Department") {
      addDepartment();
    } else if (answers.choice === "Add Role") {
      addRole();
    } else if (answers.choice === "Add Employee") {
      addEmployee();
    } else if (answers.choice === "View Departments") {
      listDepartments().then(restart);
    } else if (answers.choice === "View Roles") {
      listRoles().then(restart);
    } else if (answers.choice === "View Employees") {
      listEmployees().then(restart);
    } else if (answers.choice === "Update Roles") {
      updateRoles();
    } else {
      conn.end();
    }
  });
}

// add a couple of lines of space between prompts
function _sp(){
  console.log('');
  console.log('');
}

// goes back to the start of the initial question prompts
function restart() {
  startEmployeeManager()
}