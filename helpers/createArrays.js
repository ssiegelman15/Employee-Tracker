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

module.exports = {allDepartments, allEmployees, allRoles};