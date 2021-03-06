require('dotenv').config()

const mysql = require('mysql2/promise')
const mysql2 = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})

const db2 = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})

const getDepartments = async () => {
  const departments = []
  const con = await db
  const [rows, fields] = await con.execute('SELECT name FROM department')
  for (let i = 0; i < rows.length; i++) {
    departments.push(rows[i].name)
  }
  return departments
}

const getDepartmentsGeneral = async () => {
  const con = await db
  const [rows, fields] = await con.execute('SELECT * FROM department')
  return rows
}

const getRoles = async () => {
  const roles = []
  const con = await db
  const [rows, fields] = await con.execute('SELECT title FROM role')
  for (let i = 0; i < rows.length; i++) {
    roles.push(rows[i].title)
  }
  return roles
}

const getRolesGeneral = async () => {
  const con = await db
  const [rows, fields] = await con.execute(
    'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id'
  )
  return rows
}

const getEmployees = async () => {
  const employees = []
  const con = await db
  const [rows, fields] = await con.execute(
    'SELECT first_name, last_name FROM employee'
  )
  for (let i = 0; i < rows.length; i++) {
    employees.push(rows[i].first_name + ' ' + rows[i].last_name)
  }
  return employees
}

const getEmployeesGeneral = async () => {
  const con = await db
  const [rows, fields] = await con.execute(
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id'
  )
  return rows
}

const addDepartmentSQL = (dept) => {
  db2.query(
    `INSERT INTO department (name) VALUES (?)`,
    dept,
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        console.info('New department added!')
      }
    }
  )
}

const addRoleSQL = async (title, salary, department) => {
  const departments = await getDepartments()
  const deptNum = departments.indexOf(department) + 1
  db2.query(
    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    [title, salary, deptNum],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        console.info('New role added!')
      }
    }
  )
}

const addEmployeeSQL = async (firstName, lastName, role, manager) => {
  const roles = await getRoles()
  const roleNum = roles.indexOf(role) + 1
  const employees = await getEmployees()
  const managerNum = employees.indexOf(manager) + 1
  db2.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    [firstName, lastName, roleNum, managerNum],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        console.info('New employee added!')
      }
    }
  )
}

const updateEmployeeRoleSQL = async (employee, role) => {
  const roles = await getRoles()
  const roleNum = roles.indexOf(role) + 1
  const employees = await getEmployees()
  const empNum = employees.indexOf(employee) + 1
  db2.query(
    'UPDATE employee SET role_id = ? WHERE id = ?',
    [roleNum, empNum],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        console.info('Employee role updated!')
      }
    }
  )
}

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartmentSQL,
  addRoleSQL,
  addEmployeeSQL,
  updateEmployeeRoleSQL,
  getDepartmentsGeneral,
  getRolesGeneral,
  getEmployeesGeneral,
}
