// Import inquirer, express and mysql2
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const { initialPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateRolePrompt } = require('./helpers/questions')

// Initialize arrays of employees, departments, and roles to be filled form database
const allEmployees = [];
const allDepartments = [];
const allRoles = [];

// Create Port with ability to send to Heroku
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create connection to database using personal log-in info
const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: 'C00rs!srael22',
      database: 'employee_db'
  },
  console.log(`You are now connected to the employees_db!`)
);

// Function to initialize app
function init() {
  inquirer
    .prompt(initialPrompt)
    .then((response => {
      switch(response.initial) {
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