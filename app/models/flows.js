'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const Flows = sequelize.define('Flows', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowDefault: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  })

  Flows.associate = (models)  => {
    Flows.hasMany(models.Blocks)
  }

  return Flows
}


