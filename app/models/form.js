const Sequelize = require('sequelize')

module.exports = function() => {
    const candidateForm = sequelize.define('candidateform', {
	id: {
	    type: Sequelize.Integer,
	    autoIncrement: true,
	    primaryKey: true
	},
	block: {
	    type: Sequelize.json,
	    allowNull: false
	}
    })
    return candidateForm
}
