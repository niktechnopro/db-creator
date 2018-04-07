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


function ingridientProcessor(array, i, ingredient){
    let tempIndex = false;
    array.forEach((ingr, index)=>{ 
        let lineArray = ingr.split(' ')
        let yesno = lineArray.some((element)=>{//looking for any ingredient
            return ingredient == element
        })
        if (yesno){
            tempIndex = i;
        }
    })
    return tempIndex
}


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
        let matchArray = [];
        Recipes.findAll().then((recipes) => {
            // let testArray = recipes.slice(0,3);
            for (let i=0; i < recipes.length; i++){
                let ingrIndex = ingridientProcessor(JSON.parse(recipes[i].ingredients), i, ingredient);      
                if (ingrIndex !== false){
                    matchArray.push(ingrIndex)
                }
            }
            let target = matchArray.map((el, i) => recipes[el]) 
            res.send(target)
        }).catch(err => console.log(err))
    })

    .delete((req, res)=>{
        console.log("let's delete your account")//we'll use ajax request for it
    })

//handing add to favorites portion
router.route('/addToFavorite')
    .get((req, res)=>{

    })
    .post((req, res)=>{
        console.log(req.body)
        res.send('success')
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