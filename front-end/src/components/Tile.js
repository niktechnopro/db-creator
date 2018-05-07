import React, { Component } from 'react';


const Tile = (props) => {
  // console.log(props);
  let recipe = props.recipe;
  let directions = Object.entries(JSON.parse(recipe.directions));
  return(
      <div className="tileWrapper" onClick={()=>{props.open(recipe)}} className="row">
         <div className="title">{recipe.title}</div>
          <div className='recipeWrapper'>
              <div className="recipeHeader">
                <h3>Rating : {(Number(recipe.rating)).toFixed(2)}</h3>
             </div>
            <main className="mainContainer">
              <div className="leftContainer">
                 <div className="image"><img className="image" src={recipe.image} /></div>
              </div>
              <div className="rightContainer">
                <h3>Preparation : {directions[0][1]}in</h3>
                <div className="steps">{directions[1][1]}</div>
              </div>
            </main>
         </div> {/* end of main container */}
      </div>       
   )
}

// class Tile extends Component{
//   constructor(){
//     super();
//   }


// 	render(){
//     // console.log(this.props)
// 		let recipe = this.props.recipe;
//     // console.log(recipe)
// 		// let ingredients = JSON.parse(recipe.ingredients);
// 		let directions = Object.entries(JSON.parse(recipe.directions));
// 		// let nutrients = Object.entries(JSON.parse(recipe.nutrients));//this returns 
// 		// array of arrays made up from key/value pairs
// 		// console.log(ingredients)
//     // let ingredient = ingredients.map((item, index)=>{
//     //   return <li>{item}</li>
//     // })
// 		return(
//       <div className="tileWrapper" onClick={()=>{this.props.open(recipe)}} className="row">
//         	<div className="title">{recipe.title}</div>
//           <div className='recipeWrapper'>
//               <div className="recipeHeader">
//                 <h3>Rating : {(Number(recipe.rating)).toFixed(2)}</h3>
//             	</div>
//             <main className="mainContainer">
//               <div className="leftContainer">
//                 	<div className="image"><img className="image" src={recipe.image} /></div>
//               </div>
//               <div className="rightContainer">
//                 <h3>Preparation : {directions[0][1]}in</h3>
//                 <div className="steps">{directions[1][1]}</div>
//               </div>
//             </main>
//         	</div> {/* end of main container */}
//       </div>     	
// 		)
// 	}
// }

export default Tile;

