'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const Setups = sequelize.define('Setups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      min_points: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
  })

  return Setups
}
