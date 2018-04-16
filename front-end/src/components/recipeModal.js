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
			console.log(ingredients)
	    var ingredient = ingredients.map((item, index)=>{
	       		return <li>{item}</li>
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
                	<h3>Rating for this recipe:</h3>
                	<h3>Preparation : {directions[0][1]}in</h3>
            	</div>
            	<main className="modalMainContainer">
              		<div className="modalLeftContainer">
                		<div><img className="modalImage" src=" https://images.media-allrecipes.com/userphotos/560x315/2004499.jpg" /></div>
              		</div>
              		<div className="modalRightContainer">
              			<div className="modalSteps">{directions[1][1]}</div>
              			<div className="modalSteps">Ingredients:</div>
                		<ul className="modalIngredients">
                			{ingredient}
                		</ul>
              		</div>
           		</main>
        	</div>
		<button onClick={props.close}>close damn modal</button>
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