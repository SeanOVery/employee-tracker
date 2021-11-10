const inquirer = require('inquirer')

const questions = {
  mainMenuQuestion: [
    {
      type: 'rawlist',
      message: 'What would you like to do?',
      name: 'mainMenu',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role'
      ]
    }
  ],

  addDepartment: [
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'newDepartment'
    }
  ],

  addRole: [
    {
      type: 'input',
      message: 'What is the name of this new role?',
      name: 'newRoleName'
    },
    {
      type: 'input',
      message: 'What is the salary for this role?',
      name: 'newRoleSalary'
    },
    {
      type: 'rawlist',
      message: 'Which department does this role belong to?',
      choices: [
        //TODO Add code to pull all departments from database here likely from sqlCommands.js
      ]
    }
  ],

  addEmployee: [
    {
      type: 'input',
      message: `What is the employee's first name?`,
      name: 'newEmpFirstName'
    },
    {
      type: 'input',
      message: `What is the employee's last name?`,
      name: 'newEmpLastName'
    },
    {
      type: 'rawlist',
      message: `What is the employee's role?`,
      choices: [
        //TODO Add code to pull all roles from database here likely from sqlCommands.js
      ]
    },
    {
      type: 'rawlist',
      message: `Who will be the employee's manager?`,
      choices: [
        //TODO Add code to pull all employees from database here likely from sqlCommands.js, also optional none
      ]
    },
  ],

  updateEmployeeRole: [
    {
      type: 'rawlist',
      message: 'Which employee would you like to update the role for?',
      choices: [
        //TODO Add code to pull all employees from database
      ]
    },
    {
      type: 'rawlist',
      message: `What is the employee's new role?`,
      choices: [
        //TODO Add code to pull all roles from database here likely from sqlCommands.js
      ]
    }
  ]
}

module.exports = {questions}