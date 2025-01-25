const express = require('express')
const mysql = require('mysql2/promise')

const mainPage = require('./pages/mainPage')
const carsTable = require('./pages/carsTable')
const driversTable = require('./pages/driversTable')
const trafficsTable = require('./pages/trafficsTable')
const searchCar = require('./pages/searchCar')
const searchDriver = require('./pages/searchDriver')
const listen = require('./pages/listen')
const searchFullName = require('./pages/searchFullName')
const searchStartPoint = require('./pages/searchStartPoint')
const searchStateNumber = require('./pages/searchStateNumber')

const app = express()
const port = 3000

const sql = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'dinamic-site',
	password: 'mysql'
})

mainPage(app, sql)
carsTable(app, sql)
driversTable(app, sql)
trafficsTable(app, sql)
searchCar(app, sql)
searchDriver(app, sql)
listen(app, port)
searchFullName(app, sql)
searchStartPoint(app, sql)
searchStateNumber(app, sql)