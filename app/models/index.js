'use strict'

var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')
var basename = path.basename(module.filename)
var db = {}

const database = 'wewantyou'
const dbUsername = 'postgres'
const dbPassword = ''
const dbHost = 'localhost'
const dbDialect = 'postgresql'
const sequelize = new Sequelize(database, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
})

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename)
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return
    var model = sequelize['import'](path.join(__dirname, file))
    console.log(model.name)
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
