// Import inquirer and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const { initialPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateRolePrompt } = require('./helpers/questions');
const {allDepartments, allEmployees, allRoles} = require('./helpers/createArrays');

// Create connection to database using personal log-in info
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: "C00rs!srael22",
    database: 'employees_db'
  },
  console.log(`You are now connected to the employees_db!`)
);

const viewEmployees = () => db.query(`
SELECT employees.id AS ID, 
CONCAT(employees.firstName, ' ', employees.lastName) AS Name,
CONCAT(manager.firstName,' ', manager.lastName) AS Manager, 
roles.title AS Title, 
roles.salary AS Salary, 
departments.departmentName AS Department
FROM employees
JOIN roles ON employees.roleId = roles.id 
LEFT JOIN employees manager ON manager.id = employees.managerId
JOIN departments ON roles.departmentId = departments.id 
ORDER BY employees.id;`, (err, results) => {
  if (err) {
    console.error(err)
  } else {
    console.table('\x1B[36m', results)
  }
  init();
});

const viewRoles = () => db.query(`
SELECT roles.id AS ID, 
roles.title AS Title, 
roles.salary AS Salary,
departments.departmentName AS Department
FROM roles
JOIN departments ON roles.departmentId = departments.id 
ORDER BY roles.id;`, (err, results) => {
  if (err) {
    console.error(err)
  } else {
    console.table('\x1B[36m', results)
  }
  init();
});

const viewDepartments = () => db.query(`
SELECT departments.id AS ID, 
departments.departmentName AS Department
FROM departments;`, (err, results) => {
  if (err) {
    console.error(err)
  } else {
    console.table('\x1B[36m', results)
  }
  init();
});

const addDepartment = () => {
  inquirer
      .prompt(addDepartmentPrompt)
      .then((response) => {
          db.query(`INSERT INTO departments (departmentName) VALUES (?)`, response.addDepartment, (err, results) => {
              if (err) {
                  console.error(err)
              } else {
                  console.log('\x1b[36m Department has been added to the database!');
              }
              init();
          })
      })
};

const exitApp = () => {
  console.log("Thanks for stopping by!");
  db.end();
}

// Function to initialize app
function init() {
  inquirer
    .prompt(initialPrompt)
    .then((response => {
      console.log(allDepartments);
      console.log(allEmployees);
      console.log(allRoles);
      switch (response.prompt) {
        case 'View All Employees':
          // function done
          viewEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Roles':
          updateRoles();
          break;
        case 'View All Roles':
          // function done
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          // function done
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          // function done
          exitApp();
          break;
      }
    }));
}

// Function call to initialize app
init();