const inquirer = require('inquirer');

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