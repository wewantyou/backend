'use strict'

const express = require('express')
const sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
const port = 8080
const dbAddr = 'localhost'

const candidatesRoutes = require('./app/routes/candidates')

app.use(bodyParser.json())

candidatesRoutes(app)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
