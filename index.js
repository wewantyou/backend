'use strict'

const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

const database = 'wewantyou'
const dbUsername = 'root'
const dbPassword = ''
const dbHost = 'localhost'
const dbDialect = 'mysql'
const sequelize = new Sequelize(database, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
})

const candidatesRoutes = require('./app/routes/candidates')

app.use(bodyParser.json())

candidatesRoutes(app)

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.log(`Errored: ${err}`)
    sequelize.close()
  })
