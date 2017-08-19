const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const Candidates = sequelize.define('Candidates', {
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
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    indication_level: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    createdAt: {
	type: Sequelize.DATE,
    },
    updatedAt: {
	type: Sequelize.DATE,
    },
  }, {
    classMethods: {
      associate: function (models) {
	Candidates.hasOne(models.Forms)
      },
    }
  })

  return Candidates
}
