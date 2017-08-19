'use strict'

const express = require('express')
const sequelize = require('sequelize')
const bodyParser = require('body-parser')

const app = express()
const port = 8080
const dbAddr = 'localhost'

app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
