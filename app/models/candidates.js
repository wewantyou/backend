const Sequelize = require('sequelize')

module.exports = function() => {
    const candidate = sequelize.define('candidate', {
	id: {
	    type: Sequelize.Integer,
	    autoIncrement: true,
	    primaryKey: true
	},
	name: {
	    type: Sequelize.String,
	    allowNull: false
	}
	fullContactProfile: {
	    type: Sequelize.json,
	    allowNull: true
	},
	email: {
	    type: Sequelize.String,
	    allowNull: false,

	},
	form: {
	    type: Sequelize.Integer,
	    allowNull: true
	}
})
    return candidate
}
