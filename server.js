// Import inquirer and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const { initialPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateRolePrompt } = require('./helpers/questions')

// Initialize arrays of employees, departments, and roles to be filled form database
const allEmployees = [];
const allDepartments = [];
const allRoles = [];

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
SELECT employees.id AS id, 
CONCAT(employees.firstName, ' ', employees.lastName) AS name,
CONCAT(manager.firstName,' ', manager.lastName) AS manager, 
roles.title AS title, 
roles.salary AS salary, 
departments.departmentName AS department
FROM employees
JOIN roles ON employees.roleId = roles.id 
LEFT JOIN employees manager ON manager.id = employees.managerId
JOIN departments ON roles.departmentId = departments.id 
ORDER BY employees.id;`, (err, results) => {
  if (err) {
    console.error(err)
  } else {
    console.table('\x1b[33m', results)
  }
  init();
});


// Function to initialize app
function init() {
  inquirer
    .prompt(initialPrompt)
    .then((response => {
      switch (response.prompt) {
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Roles':
          updateRoles();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Exit':
          exitApp();
          break;
      }
    }));
}

// Function call to initialize app
init();