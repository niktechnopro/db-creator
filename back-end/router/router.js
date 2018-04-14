console.log('loading router module')
var express = require('express');
var router = express.Router();
const passport = require('passport');
// const Users = require('../models/users');//loading table model
const Recipes = require('../models/recipes')
const Users = require('../models/users')
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
    .post((req, res)=>{
        console.log(req.body.data)
        let email = req.body.data.user;
        let recipeId = req.body.data.id;
        Users.findOne({//first let's pull favorites for this user
            attributes: ['favorites'],//pulling favorites from database
            where: {
                email: email
            }
        }).then((result) => {
            console.log('user: ', email, 'has favorites: ', result.favorites)
            if (result){//if result exists - meaning user is logged in
                let favorite = JSON.parse(result.favorites);
                favorite.push(recipeId);
                Users.update(//updating the favorites array
                    {favorites: JSON.stringify(favorite)},
                    {where: {email: email}}
                ).then((result) => {
                    res.json({
                        result: 'success'
                    })
                })
            }else{
                console.log('login to use Favorites')
            }
        })
    })




function createFavorites(favarr){
    var element;
    const favs = favarr.map((recipeIndx, index)=>{//returns array of promises
        return Recipes.findOne(
            {where: {id: recipeIndx}}
        )
    })
    return Promise.all(favs).then(values => values);
}


//handing remove from favorites portion
router.route('/removeFromFavorites')
    .post((req, res)=>{
        console.log(req.body.data)
        let email = req.body.data.user;
        let recipeId = req.body.data.id;
        console.log('remove recipeID: ', recipeId, 'with: ', email)
        Users.findOne({//first let's pull favorites for this user
            attributes: ['favorites'],//pulling favorites from database
            where: {
                email: email
            }
        }).then((result) => {
            if (result){//if result exists - meaning user is logged in
                let favorite = JSON.parse(result.favorites);
                // let's find position of recipeId in our favorites array and remove the element
                let idx = favorite.indexOf(recipeId);
                favorite.splice(idx, 1);//removes our index
                Users.update(//updating the favorites array
                    {favorites: JSON.stringify(favorite)},
                    {where: {email: email}}
                ).then((result) => {
                    res.json({
                        result: 'success'
                    })
                })
            }else{
                console.log('login to use Favorites')
            }
        })
    })

//to retrieve recipes for specific user
router.route('/favorites')
    .post((req, res)=>{
        console.log('we are in favorites route', req.body)
        if(req.body.data){//email
            Users.findOne({//first let's pull favorites for this user
                attributes: ['favorites'],//pulling favorites from database
                where: {
                    email: req.body.data
                }
            }).then((result) => {
                return JSON.parse(result.favorites);//converting back to normal array
            }).then((favarr) => {
                    let favorites = createFavorites(favarr)
                    favorites.then(el => res.send(el))    
                })
            }
        })

//registering routes info
router.route('/register')
    .post((req, res)=>{
        //body property is available because we have a body-parser
        let favorite = new Array();
        let favorites = JSON.stringify(favorite);
        console.log(favorites)
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        console.log('reading from register form: ', username, email, password)
        Users.findOne({//veryfies if user already exists, before creating an entry
            where: { email: email}, 
        }).then(result => {
            console.log('then in register post', result)
            if (result === null){
                Users.create({
                    email: email,
                    userName: username,
                    password: password,
                    favorites: favorites
                }).then(result => {
                    res.json({
                        result: 'success'
                    })
                }).catch(error => {
                    console.log('catch error', error)
                })
            }else{
                res.json({
                    result: 'alreadyIn'
                })
            }
        }).catch(result => {
            res.json({
                result: 'something went wrong, try again'  
            }) 
        })
})

router.route('/login') //handles login
    .post((req, res)=>{
        console.log(req.body)
        let email = req.body.email;
        let password = req.body.password;
        Users.findOne({
            where:{
                email: email,
                password: password
            }
        }).then(result => {
            // console.log('result', result)
            if (result){ //if result exist
                res.json({
                    username: result.userName,
                    email: result.email,
                    login: 'success'
                })
            }else{ //if result = null
                res.json({
                    login: 'badlogin'
                })
            }     
        }).catch(error=>{
            // res.status(400).send('error') - this is just to send error
            console.log(error)
        })
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