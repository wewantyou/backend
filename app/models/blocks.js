'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize) => {
	const Blocks = sequelize.define('Blocks', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		block: {
			type: Sequelize.JSON,
			allowNull: false,
		},
		createdAt: {
        	type: Sequelize.DATE,
      	},
      	updatedAt: {
        	type: Sequelize.DATE,
      	},
	})

	Blocks.associate = (models) => {
		Blocks.belongsTo(models.Flows)
	}

	return Blocks
}