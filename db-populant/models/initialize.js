const Sequelize = require('sequelize');
const Recipes = require('./recipes');
const sequelize = require('../db')


Recipes.sync({force:true})
.then(firstMap => {
    console.log(firstMap);
});