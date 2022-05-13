const mysql = require('mysql');

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

db.query(`SELECT * FROM departments`, (err, results) => {
  if (err) {
      console.error(err);
  }        
  for (let department of results) {
      allDepartments.push(department.departmentName);
  }
});

db.query(`SELECT * FROM roles`, (err, results) => {
  if (err) {
      console.error(err);
  }        
  for (let role of results) {
      allRoles.push(role.title);
  }
});

db.query(`SELECT * FROM employees`, (err, results) => {
  if (err) {
      console.error(err);
  }        
  for (let employee of results) {
      allEmployees.push(`${employee.firstName} ${employee.lastName}`);
  }
});

const initialPrompt = [
  {
    type: "list",
    message: "Please choose what you would like to do:",
    choices: ["View All Employees", "Add Employee", "Update Employee Roles", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
    name: "prompt"
  },
];

const addDepartmentPrompt = [
  {
    type: "input",
    message: "What is the name of the department that you would like to add?",
    name: "addDepartment"
  }
];

const addRolePrompt = [
  {
    type: "input",
    message: "What is the name of the role that you would like to add?",
    name: "addRole"
  },
  {
    type: "input",
    message: "What is the salary for this role?",
    name: "roleSalary"
  },
  {
    type: "list",
    message: "What department does this role report to?",
    choices: allDepartments,    
    name: "roleDepartment"
  }
];

const addEmployeePrompt = [
  {
    type: "input",
    message: "What is the new employee's first name?",
    name: "firstName"
  },
  {
    type: "input",
    message: "What is the new employee's last name?",
    name: "lastName"
  },
  {
    type: "list",
    message: "What role will the new employee have?",
    choices: ["NEED TO UPDATE THIS TO SHOW ALL ROLES", "AND HAVE IT ABLE TO READ THE UP TO DATE ROLES ARRAY"],    
    name: "employeeRole"
  },
  {
    type: "list",
    message: "Who will the new employee's manager be?",
    choices: ["NEED TO UPDATE THIS TO SHOW ALL EMPLOYEES", "AND HAVE IT ABLE TO READ THE UP TO DATE EMPLOYEE ARRAY", "WITH NONE AS FIRST OPTION"],    
    name: "employeeManager"
  }
];

const updateRolePrompt = [
  {
    type: "list",
    message: "Which employee's role would you like to update?",
    choices: ["NEED TO UPDATE THIS TO SHOW ALL EMPLOYEES", "AND HAVE IT ABLE TO READ THE UP TO DATE EMPLOYEE ARRAY"],    
    name: "employeeRoleUpdate"
  },
  {
    type: "list",
    message: "What role would you like to assign?",
    choices: ["NEED TO UPDATE THIS TO SHOW ALL ROLES", "AND HAVE IT ABLE TO READ THE UP TO DATE ROLES ARRAY"],    
    name: "newRole"
  }
]

module.exports = {initialPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateRolePrompt};