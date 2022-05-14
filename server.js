// Import inquirer and mysql2
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
const { populateEmployeeArray,populateRoleArray, populateDepartmentArray, initialPrompt, addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateRolePrompt } = require('./helpers/questions');
// const { allDepartments, allEmployees, allRoles } = require('./helpers/createArrays');

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
roles.title AS Job_Title, 
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

const addRole = () => {
  inquirer
    .prompt(addRolePrompt)
    .then((response) => {
      // Initialize department Id variable
      let departmentId;
      // Change department name response to department Id response since thats how roles are stored
      db.query(`SELECT (id) FROM departments WHERE departmentName=(?)`, response.roleDepartment, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          departmentId = results[0].id;
        }
        // Using department Id and title/salary inputs, insert new role into table
        db.query(`INSERT INTO roles (title, departmentId, salary) VALUES (?, ?, ?)`, [response.addRole, departmentId, response.roleSalary], (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log('\x1b[36m Role successfully added to the database!');
          }
        })
      })
      init();
    })
};

const addEmployee = () => {
  inquirer
    .prompt(addEmployeePrompt)
    .then((response) => {
      // Initialize department Id variable
      let roleId;
      // Change department name response to department Id response since thats how roles are stored
      db.query(`SELECT (id) FROM roles WHERE title=(?)`, response.employeeRole, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          roleId = results[0].id;
        }

        let managerId;
        let employeesManager = response.employeeManager.split(' ');
        db.query(`SELECT (id) FROM employees WHERE firstName = "${employeesManager[0]}" AND lastName = "${employeesManager[1]}"`, employeesManager, (err, results) => {
          if (err) {
            console.error(err);
          } else {
            managerId = results[0].id;
          }
          // Using department Id and title/salary inputs, insert new role into table
          db.query(`INSERT INTO employees (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)`, [response.firstName, response.lastName, roleId, managerId], (err, results) => {
            if (err) {
              console.error(err)
            } else {
              console.log('\x1b[36m Employee successfully added to the database!');
            }
          })
        })
      })
      init();
    })
};

const updateRoles = () => {
  inquirer
    .prompt(updateRolePrompt)
    .then((response) => {
      // Initialize department Id variable
      let roleId;
      // Change department name response to department Id response since thats how roles are stored
      db.query(`SELECT (id) FROM roles WHERE title=(?)`, response.newRole, (err, results) => {
        if (err) {
          console.error(err);
        } else {
          roleId = results[0].id;
        }

        let employeeId;
        let employeeName = response.employeeRoleUpdate.split(' ');
        db.query(`SELECT (id) FROM employees WHERE firstName = "${employeeName[0]}" AND lastName = "${employeeName[1]}"`, employeeName, (err, results) => {
          if (err) {
            console.error(err);
          } else {
            employeeId = results[0].id;
          }
          // Using employee Id and role Id from above, update targeted employees role
          db.query(`UPDATE employees SET roleId = (?) WHERE id = ${employeeId}`, [roleId], (err, results) => {
            if (err) {
              console.error(err)
            } else {
              console.log('\x1b[36m Employee successfully updated!');
            }
          })
        })
      })
      init();
    })
};

const exitApp = () => {
  console.log("Thanks for stopping by!");
  db.end();
  process.exit();
};

// Function to initialize app
function init() {
  populateEmployeeArray();
  populateRoleArray();
  populateDepartmentArray();
  inquirer
    .prompt(initialPrompt)
    .then((response => {
      switch (response.prompt) {
        case 'View All Employees':
          populateEmployeeArray();
          viewEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Roles':
          updateRoles();
          break;
        case 'View All Roles':
          populateRoleArray();
          viewRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          populateDepartmentArray();
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