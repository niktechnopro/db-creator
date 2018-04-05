const Sequelize = require('sequelize');
const connection = require('../db');
const Recipes = require('./recipes');

//this is where we actually creating table if it was not created yet
//in sequelize language creating a model means creating a table
const Users = connection.define('user', {
	userID:{
		type: Sequelize.STRING,
        allowNull: false,
	},
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // to ensure every email is unique
        // validate: {isEmail: true} //to ensure it looks like an email
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gmailID: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    facebookID: {
    	type: Sequelize.INTEGER,
    	allowNull: true
    },
    favorites: {
    	type: Sequelize.STRING,
    	allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


Users.hasOne(Recipes);
module.exports = Users;