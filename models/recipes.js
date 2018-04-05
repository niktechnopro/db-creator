console.log('actual table')
const Sequelize = require('sequelize');
const connection = require('../db');

//this is where we actually creating table if it was not created yet
//in sequelize language creating a model means creating a table
const Recipes = connection.define('recipes', {
    title: {
        type: Sequelize.STRING,
        // allowNull: false,
        // unique: true, // to ensure every email is unique
    },
    ingredients: {
        type: Sequelize.TEXT,
        // allowNull: false
    },
    directions: {
        type: Sequelize.TEXT,
        // allowNull: false
    },
    nutrients: {
        type: Sequelize.TEXT,
    },
    source: {
        type: Sequelize.TEXT,
    },
    image: {
        type: Sequelize.STRING,
    },
    rating: {
        type: Sequelize.STRING
    }
})


module.exports = Recipes;