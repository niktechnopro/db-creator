//dotenv must be the first thing to load
require('dotenv').config();//dotenv package would allow us to use credentials from .env package
const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const config = require('./config/config'); //config file with db and email info
const app = express();
const router = require('./router/router');//loading router from routes folder
const port = process.env.PORT || 3002; //configures to available port based on
//enviroment variable or port 3000 by default - for easier management
// json is an option of bodyParser
// app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false})); //what is urlencoded

//creating static path from the root of our harddrive to public folder
app.use(express.static(__dirname + '/public'));
//the following part is needed for React.js

//to use router for routes
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(router);
// creating a server
var server = http.createServer(app);

server.listen(port, (error) => {
    (error) ? console.log("your code sucks"): console.log(`listening on port ${port}`);
});
