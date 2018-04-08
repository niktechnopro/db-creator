import React, { Component } from 'react';
import axios from 'axios';

class Tile extends Component{
  constructor(){
    super();
    this.state = ({
      favorites: [],
      favColor: 'lightgreen',
      favText: 'Add To Favorites'
    })
    this.addToFavorite = this.addToFavorite.bind(this)
  }

  addToFavorite(id){
    console.log(id)
    let text = '';
    let color;
    axios.post('http://localhost:3002/addToFavorite',{
      data: id
    }).then((response)=>{
      if (response.data = "success"){
        if (this.state.favText == "Remove From Favorites"){
          text = "Add To Favorites";
          color = 'lightgreen';
        }else{
          text = "Remove From Favorites";
          color = 'red';
        }
        this.setState({
          favColor: color,
          favText: text
        })
      }
    })  
  }


	render(){
		let recipe = this.props.recipe;
    // console.log(recipe)
		let ingredients = JSON.parse(recipe.ingredients);
		let directions = Object.entries(JSON.parse(recipe.directions));
		let nutrients = Object.entries(JSON.parse(recipe.nutrients));//this returns 
		// array of arrays made up from key/value pairs
		// console.log(ingredients)
    let ingredient = ingredients.map((item, index)=>{
      return <li>{item}</li>
    })
		return(
      <div className="row">
        	<div className="title">{recipe.title}</div>
          <div className='recipeWrapper'>
              <div className="recipeHeader">
                <h3>Rating : {(Number(recipe.rating)).toFixed(2)}</h3>
                <button className="favorite" 
                style = {{backgroundColor: this.state.favColor}}
                onClick={()=>this.addToFavorite(recipe.id)}>
                {this.state.favText}</button>
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

