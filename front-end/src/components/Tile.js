import React, { Component } from 'react';

class Tile extends Component{

  addToFavorite(){
    console.log('add to favorite')
  }


	render(){
		let recipe = this.props.recipe;
    console.log(recipe)
		let ingredients = JSON.parse(recipe.ingredients);
		let directions = Object.entries(JSON.parse(recipe.directions));
		let nutrients = Object.entries(JSON.parse(recipe.nutrients));//this returns 
		// array of arrays made up from key/value pairs
		console.log(ingredients)
    let ingredient = ingredients.map((item, index)=>{
      return <li>{item}</li>
    })
		return(
      <div className="row">
        	<div className="title">{recipe.title}</div>
          <div className='recipeWrapper'>
              <div className="recipeHeader">
                <h3>Rating : {(Number(recipe.rating)).toFixed(2)}</h3>
                <button className="favorite" onClick={this.addToFavorite.bind(this)}>Add To Favorite</button>
            	</div>
            <main className="mainContainer">
              <div className="leftContainer">
                	<div className="col s2 image"><img className="image" src={recipe.image} alt="recipe picture" /></div>
              </div>
              <div className="rightContainer">
                <h3>Preparation : {directions[0][1]}in</h3>
                <div className="steps">{directions[1][1]}</div>
              </div>
            </main>
        	</div> {/* end of main container */}
        <hr /> 
      </div>     	
		)
	}
}

export default Tile;

//return(
  //       <div className="row">
  //        <div className="title">{recipe.title}</div>
  //           <div className="mainContainer col s4 m12">
  //            <div className="leftContainer">
  //                <div className="col s2 image"><img className="image" src={recipe.image} alt="recipe picture" /></div>
  //               </div>
  //               <div className="rightContainer">
  //                <div className="directions">{directions[0][0]} : {directions[0][1]}</div>
     //                <div className="steps">{directions[1][0]}s : {directions[1][1]}</div>
  //               </div>
  //        </div>
  //       <hr /> 
  //       </div>           
        // )

