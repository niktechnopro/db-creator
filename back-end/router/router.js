console.log('loading router module')
var express = require('express');
var router = express.Router();
const passport = require('passport');
// const Users = require('../models/users');//loading table model
const Recipes = require('../models/recipes')
console.log(Recipes)
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    let d = new Date();
    console.log('Time: ', d.toString())//just to log request time
    next()
})
// define the home page route(we using handler function chaining for one route)
router.route('/getRecipes')
    .get((req, res)=>{
        console.log('pulling info from database')
        Recipes.findAll().then((recipes) => {
            res.json(recipes)
        })
    })
    .post((req, res)=>{
        let ingredient = req.body.data;
        console.log('searching for recipe with', ingredient)
    })

    .delete((req, res)=>{
        console.log("let's delete your account")//we'll use ajax request for it
    })

//registering routes info
router.route('/register')
    .get((req, res)=>{
        console.log('serving register page');
    })
    .post((req, res)=>{
        //body property is available because we have a body-parser
        console.log(req.body)
})

router.get('/success/:name',(req, res)=>{
    console.log(req.body)
})

function rebuilder(recipes){
    var rebuiltRecipes = recipes.map((recipe, index)=>{
        // let keys = Object.keys(JSON.parse(recipe));
        return recipe
    })
    return (rebuiltRecipes)
}

module.exports = router;