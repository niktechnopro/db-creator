const Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
const sequelize = require('./db')
const Recipes = require('./models/recipes');//loading table model

var recipiesPath = path.join(__dirname + '/Smoothie-Recipes/');//creating a path to all recipies
//reading files from Directory

// creating table
Recipes.sync({force:true})
.then((data) => {
	console.log('table created')
	populate();
});

function populate(){
	console.log('populate is up')
	var filesPromise = new Promise((resolve, reject)=>{
		fs.readdir(`${recipiesPath}`, function(error, files){
			if (error){
				reject('issues reading the files')
			}else{
				resolve(files)
			}
		})
	})


	filesPromise.then((files) => {
		console.log(files.length)
		let data = fileIterator(files)
		data.then((ourArray) => { 
			console.log(ourArray)
		 	tablePopulate(ourArray);
		});
	})


	function fileIterator(files){
		return new Promise((resolve, reject) => {
			var recipes = new Array();
	    	files.forEach((file, index)=> {
				if (file !== '.DS_Store') {//something that finder puts into directory
				 	fs.readFile(recipiesPath+file, 'utf8', (error, data)=>{
				 		if (error){
				 			reject(error)
				 		} else{
			 				let json = makingJSON(data);
			 				recipes.push(json);
				 		} 
				 		if (recipes.length == files.length-1) {
				 			resolve(recipes)
						}
					});
				}
			});
	  	}); 
	}


	//this function will make a json data from each file
	function makingJSON(data){
		let recipeObject = {};
		let ingridientArray = [];
		let directionsObject = {};
		let nutrientsObject = {};
		//we'd have to use regular expressions to slice and dice text to JSON
		var splitData = data.split('\r\n');//split on carriage return
		// console.log(splitData)
		splitData.forEach((element, index)=>{
			let el = element.split(/:(.+)/);//split on ':'
			if (el[0] == 'Ingredient'){
				ingridientArray.push(el[1])//creating array with ingridients
			}else if(el[0] == 'Duration'){
				directionsObject['Duration'] = el[1];
			}else if(el[0] == 'Step'){
				directionsObject['Step'] = el[1];	
			}else if(el[0] == 'Servings'){
				nutrientsObject[el[0]] = el[1];
			}else if(el[0] == 'Calories'){
				nutrientsObject[el[0]] = el[1];
			}else if(el[0] == 'Fat'){
				nutrientsObject[el[0]] = el[1];
			}else if(el[0] == 'Carbohydrates'){
				nutrientsObject[el[0]] = el[1];
			}else if(el[0] == 'Protein'){
				nutrientsObject[el[0]] = el[1];
			}else if(el[0] != ''){
				recipeObject[el[0]]=el[1]
			}
		})
		recipeObject['Ingredients'] = ingridientArray;
		recipeObject['Directions'] = directionsObject;
		recipeObject['Nutrients'] = nutrientsObject;
		return recipeObject;
	}

	function tablePopulate(ourArray){
		// console.log(ourArray)
		ourArray.forEach((recipe, index) => {
			Recipes.create({
				title: recipe.Title,
				ingredients: stringify(recipe.Ingredients),
				directions: stringify(recipe.Directions),
				nutrients: stringify(recipe.Nutrients),
				source: recipe.Source,
				image: recipe.Image,
				rating: recipe.Rating
			})
			.then(result => (result))
			.catch(error => console.log(error))
		});
	}


	function stringify(object){
		return JSON.stringify(object)
	}
}