import React from 'react';
import Modal from 'react-modal';


// <div className="modalSteps"></div>
//this is static component
const RecipeModal = (props) => {
	console.log(props)
	if(props.recipe){
		var recipe = props.recipe;
		console.log(recipe)
		let ingredients = JSON.parse(recipe.ingredients);
		let directions = Object.entries(JSON.parse(recipe.directions));
		let nutrients = Object.entries(JSON.parse(recipe.nutrients));//this returns 
		// array of arrays made up from key/value pairs
		console.log(nutrients)
	    var ingredient = ingredients.map((item, index)=>{
	       		return <li key={index}>{item}</li>
	     	})
	    var nutrient = nutrients.map((item, index) => {
	    	return <li key={index}>{item[0]} : {item[1]}</li>
	    })
	return(
		<Modal
		isOpen = {props.open}
		onRequestClose = {props.close}
		contentLabel = "full description of the recipe" //for assistive technology only
		>

		<div className="modalTitle">{recipe.title}</div>
          	<div className='modalWrapper'>
              	<div className="modalHeader">
                	<h3>Rating for this recipe: {(Number(recipe.rating)).toFixed(2)}</h3>
                	<h3>Preparation : {directions[0][1]}in</h3>
            	</div>
            	<main className="modalMainContainer">
              		<div className="modalLeftContainer">
                		<img className="modalImage" src={recipe.image} />
              		</div>
              		<div className="modalRightContainer">
              			<div className="leftSide">
	              			<div className="modalSteps">Ingredients:</div>
	                		<ul className="modalIngredients">
	                			{ingredient}
	                		</ul>
	                	</div>
	                	<div className="rightSide">
	                		<div className="modalSteps">Nutrients :</div>
	                		<ul className="modalIngredients">
	                			{nutrient}
	                		</ul>
	                	</div>
              		</div>
           		</main>
           		<div className="modalFooter">
                	<div className="modalSteps">{directions[1][1]}</div>
            	</div>
        	</div>
		<button onClick={props.close}>close modal</button>
		</Modal>
		)
	}else{
		return(
			<Modal
			isOpen = {props.open}
			onRequestClose = {props.close}
			contentLabel = "full description of the recipe" //for assistive technology only
			>
			</Modal>
		)
	}
}

export default RecipeModal;