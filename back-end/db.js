// require('dotenv').config();//dotenv package would allow us to use credentials from .env package
console.log('loading database')

const Sequelize = require('sequelize');// note capital on S - constructor function
// to connect const connection = new Sequelize('name of db', 'name of user', 'password', {dialect: type of database engine you are trying to connect to})
// const connection = new Sequelize('niktechnopro', 'niktechnopro', '', {host: 'localhost', dialect: 'postgres', operatorsAliases: false, logging: true})//setting up parameters for database
// console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)

const connection = new Sequelize('recipes_DB', 'recipesAdmin', 'recipesPassword', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: false, //must be function of false
    operatorsAliases: false
})


// inside there operatorAliases: false - shuts down a 
// sequelize deprecated String based operators are now deprecated. Please use Symbol based operators for better security
// logging: false or true will shut down or turn on 

module.exports = connection;
