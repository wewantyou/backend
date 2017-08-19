'use strict'

const Sequelize = require('sequelize')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Flows', {
    	id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		order: {
			type: Sequelize.ARRAY(Sequelize.INTEGER),
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
    return queryInterface.dropTable('Flows')
  }
}
