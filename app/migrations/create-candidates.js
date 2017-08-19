'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Candidates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullContactProfile: {
        type: Sequelize.JSON,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      form: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Candidates')
  }
}
