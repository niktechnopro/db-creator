import React from 'react';
import Modal from 'react-modal';
import StarRating from './StarRating';
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
		// console.log(nutrients)
	    var ingredient = ingredients.map((item, index)=>{
	       		return <li key={index}>{item}</li>
	     	})
	    var nutrient = nutrients.map((item, index) => {
	    	return <li key={index}>{item[0]}: {item[1]} {(item[0]!=='Servings' ? 'g' : '')}</li>
	    })
	return(
		<Modal
		isOpen = {props.open}
		onRequestClose = {props.close}
		contentLabel = "full description of the recipe" //for assistive technology only
		closeTimeoutMS = {400}
		>

		<div className="modalTitle">{recipe.title}</div>
          	<div className='modalWrapper'>
          		<div className="veryTop">
	                	<button className="favorite" 
	                	style = {{visibility: (props.auth) ? 'visible' : 'hidden', backgroundColor: props.favs.favColor}}
	                	onClick={()=>{props.favorite(props.favs.favText)}}>
	                	{props.favs.favText}
	                	</button>
          			<img onClick={props.close} className="closeButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJxSURBVGhD7do7q9RAGMbxtdHSC146P4AKXhBFsBG8gIJgo62WIjZiaadooaWt1vod7LVRLFVQe1FEvKDg7f+EM4ec9Z3Me2ZGk5HzwI8D2SRnH7Iz2SQ7i2QPbuIp3uLXiD7hGe7gBFYhmU24h5+wdjoFD7EL0WzDa1gbT42O0in8ER2JVkoE37AfS3If1spT9wpr0EWftymPiZQL6HIL1gqteIQummKtFVrxA2sx+nmiBs245gutOQjzhdasFJmaKkVu4zze9ZZ5aLa5isv4srAsV3GRKwjZDW+Z7ziHkKP4DGtdj6Ii/RIhnjLzJUKOILdMdhF9nGIZKhMrEXIa1nYp2UUWv99EYpVJlVC2o7+NV3YRvUm92aH0y6jEWQxlPR5j/n95FI0Rb5k3SJXYgNwSUlREPGXWLfyNpbSEFBcRT5lYapSQKkUkp0ytElKtiCynjEo8gbWfHFWLiAZ2akwoD2Btn6tqEc8UG6IjpyNo7SdHtSLLKRFSs0yVIjklQmqVKS5SUiKkRpmiIp4Smp00sFOzWWmZ7CLeEmGK1Zv8m2Wyi+jKbijWecJT5hj623hlF7mEWIZOdqky+2Btl5JdRFdyhzEfzxk7VmYrXsLaJqVosKuMrrVDPCWC+TIqoTvr1roeRUVEdz/OYAe8JQKV0XX6XpSUkOIiU7FSZGr+ryIfewta1c2AehhvvdiSzZjd7S1o0XN0OQ5rhVZcRxf9tkNPRq2Vpu4DNmIxO1FyW38s5r3kk/gKa4MpuoZoDiD3G+i/8h6pu/pdVuMiNG70eMza2Rhe4AaWjAlv9IsCPbM4BF1/jEEnuy0YyGz2GwWF/rfGLnZfAAAAAElFTkSuQmCC" />
              	</div>
              	<div className="modalHeader">
                	<h3>Rating for this recipe: <StarRating rating = {(Number(recipe.rating))} /></h3>
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
	                		<div className="modalSteps">Nutrients:</div>
	                		<ul className="modalIngredients">
	                			{nutrient}
	                		</ul>
	                	</div>
              		</div>
           		</main>
           		<div className="modalFooter">
                	<div className="modalSteps">{directions[1][1]}</div>
                	{/*<div className="modalSteps">Source : {recipe.source}</div>*/}
            	</div>
        	</div>
        	<div>
        		<h3 className="recipeSource">The source for this recipe is <a target="_blank" href={recipe.source}>here</a></h3>
        	</div>
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