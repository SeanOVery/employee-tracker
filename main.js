const inquirer = require('inquirer'),
  {addRole, addEmployee, changeEmployeeRole, mainMenuQuestion, addDepartment} = require('./utils/inquirerQuestions').questions,
  {getDepartments, getRoles, getEmployees} = require('./utils/sqlCommands')



const init = () => {
  inquirer.prompt(mainMenuQuestion)
    .then(async ({mainMenu}) => {
      switch (mainMenu) {
        case 'View all departments':
          let departments = await getDepartments()
          console.table(departments)
          init()
          break;
        case 'View all roles': 
          let roles = await getRoles()
          console.table(roles)
          init()
          break;
        case 'View all employees': 
          let employees = await getEmployees()
          console.table(employees)
          init()
          break;
        case 'Add a department':
          addDepartment(init)
          break;
        case 'Add a role':
          addRole(init)
          break;
        case 'Add an employee':
          addEmployee(init)
          break;
        case 'Update employee role':
          changeEmployeeRole(init)
          break;
        default:
          break;
      }
    })
}

init()