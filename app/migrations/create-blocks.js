'use strict'

const Sequelize = require('sequelize')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Blocks', {
      id: {
         type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      block: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      FlowId: {
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
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Blocks')
  }
}
