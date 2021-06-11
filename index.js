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
  spaces();
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

// lists all departments
async function listDepartments() {
  const [rows, fields] =  await conn.promise().query(
    "SELECT * FROM departments"
  );
  console.table(rows);
  return await rows;
}

// lists all roles
async function listRoles() {
  const [rows, fields] = await conn.promise().query(
      "SELECT * from roles",
  );
  console.table(rows);
  return await rows;
}
 // lists all employees
async function listEmployees() {
const [rows, fields] = await conn.promise().query(
  "SELECT * FROM employees"
);
console.table(rows);
return await rows;
}

// adds a department
function addDepartment() {
  spaces();
  listDepartments().then((departments) => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department you want to add? Enter here:",
        name: "department",
      },
    ])
    .then((answer) => {
      // if no answer provided go back to the start of function to add department
      if(answer.department == null || answer.department == ""){
        printError('Sorry, you did not enter any name');
        addDepartment();
      } else {
        conn.query(
          "INSERT into departments (`dept_name`) VALUES (?)",
          [answer.department],
          function (err, results, fields) {
            if (err) {
              console.error(err.message);
            } else {
              listDepartments().then((deps) => {
                console.log('Added department "%s"!', answer.department);
                restart();
              })
            }
          }
        )
      } 
    });  
  });
}

// adds a role
function addRole() {
  spaces();
  listRoles().then((roles) => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the role you want to add? Enter here:",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary amount for this role? Enter (numbers only) here:",
        name: "salary",
      },
      {
        type: "list",
        message: "To which department does this role belong? Enter here:",
        choices: [
          "1",
          "2",
          "3",
        ],
        name: "department",
      }
    ])
    .then((answers) => {
      // if no valid answer for title or salary go back to the start of add role function
      if(answers.title == null ||
         answers.title == "" ||
         answers.salary == null ||
         answers.salary == ""){
           printError('You did not enter a title and/or salary');
           addRole();
         } else {
           conn.query(
             "INSERT into roles (`title`, `salary`, `department_id`) VALUES (?, ?, ?)",
             [answers.title, answers.salary, answers.department],
             function (err, results, fields) {
              if (err) {
                console.error(err.message);
              } else {
                listRoles().then((role) => {
                  console.log('Added role "%s"!', answers.title);
                  restart();
                })
              }
            })
         }
    })
  });
}

// adds an employee
function addEmployee() {
  spaces();
  listEmployees().then((employees) => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the first name of the employee you want to add? Enter here:",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the last name of the employee you want to add? Enter here:",
        name: "lastName",
      },
      {
        type: "list",
        message: "Which role do you want to assign to this employee? Enter here:",
        choices: [
          "1",
          "2",
          "3",
        ],
        name: "roleId",
      },
      {
        type: "list",
        message: "Who is this employees manager? Enter here:",
        choices: [
          "1",
          "3",
          "5",
        ],
        name: "managerId",
      }
    ])
    .then((answers) => {
      // if no valid answer to first or last name go back to start of add employee  function
      if(answers.firstName == null ||
         answers.firstName == "" ||
         answers.lastName == null ||
         answers.lastName == ""){
           printError('You didnt enter a valid first name and/or last name');
           addEmployee();
         } else {
           conn.query(
             "INSERT into employees (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)",
             [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
             function (err, results, fields) {
              if (err) {
                console.error(err.message);
              } else {
                listEmployees().then((role) => {
                  console.log('Added employee "%s"!', answers.firstName + answers.lastName);
                  restart();
                })
              }
            })
         }
    })
  });
}

// update an existing
function updateRoles() {
  spaces();
  listRoles().then((roles) => {
    inquirer.prompt([
      {
        type: "input",
        message: "Choose the role_id of role you wish to update. Enter here:",
        name: "role_id"
      },
    ]).then((answer) => {
      //console.log(roles[answer.role_id].title);
      var role_id = answer.role_id;
      var oldvalues = roles[role_id - 1];
      inquirer.prompt([
        {
          type: "input",
          message: "Edit the title:",
          name: "title",
          default: oldvalues.title
        },
        {
          type: "input",
          message: "Edit the salary:",
          name: "salary",
          default: oldvalues.salary
        },
        {
          type: "input",
          message: "Edit the Department ID:",
          name: "department_id",
          default: oldvalues.department_id
        }
      ]).then((answers) => {
        var newvalues = answers;
        console.log('Old values:');
        console.table(oldvalues);
        console.log('New values:');
        console.table(newvalues);
        inquirer.prompt([
          {
            type: "confirm",
            message: "Are you sure you want to save the new values?",
            default: 0,
            name: "confirmation",
          }
        ]).then((answer) => {
          if(answer.confirmation){
            spaces();
            console.log('Values Saved!');
            conn.query(
              "UPDATE roles SET `title` = ?, `salary` = ?, `department_id` = ? WHERE `role_id` = ?", 
              [newvalues.title, newvalues.salary, newvalues.department_id, role_id]
            );
          }
          listRoles().then(restart);
        })
      });
    });
  });
}

// add a couple of lines of space between prompts
function spaces(){
  console.log('');
  console.log('');
}

//helper function for printing errors
function printError(msg){
  console.log('Oops...', msg);
}

// goes back to the start of the initial question prompts
function restart() {
  startEmployeeManager()
}