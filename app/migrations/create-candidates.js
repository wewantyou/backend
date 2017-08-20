'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Candidates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fullContactProfile: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      form: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      github: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referral: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referral_level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      comments: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },
      votes: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
      },
      BlockId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Candidates')
  }
}
