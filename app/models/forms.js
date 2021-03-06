const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const Forms = sequelize.define('Forms', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    block: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  })

  return Forms
}
