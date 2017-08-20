'use strict'

const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 80

const models = require('./app/models')

const candidatesRoutes = require('./app/routes/candidates')
const formsRoutes = require('./app/routes/forms')
const blocksRoutes = require('./app/routes/blocks')
const flowsRoutes = require('./app/routes/flows')
const outlookRoutes = require('./app/routes/outlook')
const poolRoutes = require('./app/routes/pool')

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

candidatesRoutes(app, models)
formsRoutes(app, models)
blocksRoutes(app, models)
flowsRoutes(app, models)
outlookRoutes(app, models)
poolRoutes(app, models)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
