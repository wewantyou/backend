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

  Blocks.associate = (models) => {
    Blocks.belongsTo(models.Flows)
    Blocks.hasMany(models.Candidates)
  }

  return Blocks
}
