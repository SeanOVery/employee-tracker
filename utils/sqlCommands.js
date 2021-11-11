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

async function getDepartments () {
  const departments = []
  const con = await db
  const [rows, fields] = await con.execute('SELECT name FROM department')
  for (let i = 0; i < rows.length; i++) {
    departments.push(rows[i].name)
  }
  return departments
}

async function getRoles () {
  const roles = []
  const con = await db
  const [rows, fields] = await con.execute('SELECT title FROM role')
  for (let i = 0; i < rows.length; i++) {
    roles.push(rows[i].title)
  }
  return roles
}

async function getEmployees () {
  const employees = []
  const con = await db
  const [rows, fields] = await con.execute('SELECT first_name, last_name FROM employee')
  for (let i = 0; i < rows.length; i++) {
    employees.push(rows[i].first_name + ' ' + rows[i].last_name)
  }
  return employees
}

const addDepartmentSQL = (dept) => {
  db2.query(`INSERT INTO department (name) VALUES (?)`, dept, (err, results) => {
    if(err) {
      console.error(err)
    } else {
      console.info('New department added!')
    }
  })
}

const addRoleSQL = async (title, salary, department) => {
  const departments = await getDepartments()
  const deptNum = departments.indexOf(department) + 1
  db2.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, deptNum], (err, results) => {
    if(err) {
      console.error(err)
    } else {
      console.info('New role added!')
    }
  })
}

const addEmployeeSQL = async (firstName, lastName, role, manager) => {
  const roles = await getRoles()
  const roleNum = roles.indexOf(role) + 1
  const employees = await getEmployees()
  const managerNum = employees.indexOf(manager) + 1
  db2.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleNum, managerNum], (err, results) => {
    if(err) {
      console.error(err)
    } else {
      console.info('New employee added!')
    }
  })
}


module.exports = {getDepartments, getRoles, getEmployees, addDepartmentSQL, addRoleSQL, addEmployeeSQL}
