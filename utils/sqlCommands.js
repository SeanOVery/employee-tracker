require('dotenv').config()

const mysql = require('mysql2/promise')

const db = mysql.createConnection({
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


module.exports = {getDepartments, getRoles, getEmployees}
