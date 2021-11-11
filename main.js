const inquirer = require('inquirer'),
  {
    addRole,
    addEmployee,
    updateEmployeeRole,
    mainMenuQuestion,
    addDepartment,
  } = require('./utils/inquirerQuestions').questions,
  { getDepartmentsGeneral, getRolesGeneral, getEmployeesGeneral } = require('./utils/sqlCommands')

const init = () => {
  inquirer.prompt(mainMenuQuestion).then(async ({ mainMenu }) => {
    switch (mainMenu) {
      case 'View all departments':
        let departments = await getDepartmentsGeneral()
        console.table(departments)
        init()
        break
      case 'View all roles':
        let roles = await getRolesGeneral()
        console.table(roles)
        init()
        break
      case 'View all employees':
        let employees = await getEmployeesGeneral()
        console.table(employees)
        init()
        break
      case 'Add a department':
        addDepartment(init)
        break
      case 'Add a role':
        addRole(init)
        break
      case 'Add an employee':
        addEmployee(init)
        break
      case 'Update employee role':
        updateEmployeeRole(init)
        break
      default:
        break
    }
  })
}

init()
