const inquirer = require('inquirer'),
  {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartmentSQL,
    addRoleSQL,
    addEmployeeSQL,
    updateEmployeeRoleSQL,
  } = require('./sqlCommands')

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
        'Update employee role',
      ],
    },
  ],

  addDepartment: async function (cb) {
    await new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            message: 'What is the name of the new department?',
            name: 'newDepartment',
          },
        ])
        .then((data) => {
          if (cb) {
            addDepartmentSQL(data.newDepartment)
            cb()
          } else {
            console.log(data)
            resolve()
          }
        })
    })
  },

  addRole: async function (cb) {
    let departments = await getDepartments()
    await new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            message: 'What is the name of this new role?',
            name: 'newRoleName',
          },
          {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'newRoleSalary',
          },
          {
            type: 'rawlist',
            message: 'Which department does this role belong to?',
            name: 'newRoleDepartment',
            choices: departments,
          },
        ])
        .then((data) => {
          if (cb) {
            addRoleSQL(
              data.newRoleName,
              data.newRoleSalary,
              data.newRoleDepartment
            )
            cb()
          } else {
            console.log(data)
            resolve()
          }
        })
    })
  },

  addEmployee: async function (cb) {
    let roles = await getRoles()
    let employees = await getEmployees()
    await new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'newEmpFirstName',
          },
          {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'newEmpLastName',
          },
          {
            type: 'rawlist',
            message: `What is the employee's role?`,
            name: 'newEmpRole',
            choices: roles,
          },
          {
            type: 'rawlist',
            message: `Who will be the employee's manager?`,
            name: 'newEmpManager',
            choices: employees,
          },
        ])
        .then((data) => {
          if (cb) {
            addEmployeeSQL(
              data.newEmpFirstName,
              data.newEmpLastName,
              data.newEmpRole,
              data.newEmpManager
            )
            cb()
          } else {
            console.log(data)
            resolve()
          }
        })
    })
  },

  updateEmployeeRole: async function (cb) {
    let roles = await getRoles()
    let employees = await getEmployees()
    await new Promise((resolve, reject) => {
      inquirer
        .prompt([
          {
            type: 'rawlist',
            message: 'Which employee would you like to update the role for?',
            name: 'empName',
            choices: employees,
          },
          {
            type: 'rawlist',
            message: `What is the employee's new role?`,
            name: 'empNewRole',
            choices: roles,
          },
        ])
        .then((data) => {
          if (cb) {
            updateEmployeeRoleSQL(data.empName, data.empNewRole)
            cb()
          } else {
            console.log(data)
            resolve()
          }
        })
    })
  },
}

module.exports = { questions }
