// Import inquirer, express and mysql2
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

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

function showTable() {
  
}

// Function to initialize app
function init() {
  inquirer
    .prompt(chooseView)
    .then((response => {
      showTable(response);
    }));
}

// Function call to initialize app
init();