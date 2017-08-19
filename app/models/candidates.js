const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    const Candidate = sequelize.define('Candidate', {
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

    return Candidate
}
