'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Candidates', 'indication_level', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Candidates', 'indication_level')
  }
}
