'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Forms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      block: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Forms')
  }
}
