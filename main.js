require('dotenv').config()

const inquirer = require('inquirer'),
  cTable = require('console.table'),
  mysql = require('mysql2'),
  {addRole, addEmployee, changeEmployeeRole} = require('./utils/inquirerQuestions').questions
