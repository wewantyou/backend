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
    referral: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    referral_level: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    comments: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    votes: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    block: {
      type: Sequelize.INTEGER,
      defaultValue: -1,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  })

  Candidates.associate = (models) => {
    Candidates.hasOne(models.Blocks)
  }

  return Candidates
}
