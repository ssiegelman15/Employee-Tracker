const initialPrompt = [
  {
    type: "list",
    message: "Please choose what you would like to do:",
    choices: ["View All Employees", "Add Employee", "Update Employee Roles", "View All Roles", "Add Role", "View All Departments", "Add Department", "Exit"],
    name: "prompt"
  }
];

module.exports = {initialPrompt};