const Sequelize = require('sequelize');
const Recipes = require('./recipes');
const sequelize = require('../db')


Recipes.sync({force:true})
            // .then(() => Recipes.create({
            //     // title: 'dummyTitle',
            //     // ingridients: 'dummyIngridients',
            //     // directions: 'dummyDirections',
            //     // userID: 'dummyID'
            // }))
.then(firstMap => {
    console.log(firstMap);
});