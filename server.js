const inquirer = require('inquirer');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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