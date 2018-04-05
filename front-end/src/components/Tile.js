import React, { Component } from 'react';

class Tile extends Component{



	render(){
		let recipe = this.props.recipe;
		let ingredients = JSON.parse(recipe.ingredients);
		let directions = Object.entries(JSON.parse(recipe.directions));
		let nutrients = Object.entries(JSON.parse(recipe.nutrients));//this returns 
		// array of arrays made up from key/value pairs
		console.log(directions, nutrients)
		return(
        <div className="row">
        	<div className="title">{recipe.title}</div>
            <div className="mainContainer col s4 m12">
            	<div className="leftContainer">
                	<div className="col s2 image"><img className="image" src={recipe.image} alt="recipe picture" /></div>
                </div>
                <div className="rightContainer">
                	<div className="directions">{directions[0][0]} : {directions[0][1]}</div>
	                <div className="steps">{directions[1][0]}s : {directions[1][1]}</div>
                </div>
        	</div>
        <hr /> 
        </div>         	
		)
	}
}

export default Tile;

