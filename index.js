'use strict'

const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

const models = require('./app/models')

const candidatesRoutes = require('./app/routes/candidates')
const formsRoutes = require('./app/routes/forms')
const blocksRoutes = require('./app/routes/blocks')

app.use(bodyParser.json())

candidatesRoutes(app, models)
formsRoutes(app, models)
blocksRoutes(app, models)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
