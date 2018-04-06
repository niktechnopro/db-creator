import React, { Component } from 'react';
import Tile from './Tile';
import axios from 'axios';


class Search extends Component{
	constructor(){
		super();
		this.state = ({
			recipes: []
		})
	}
//to see all recipes
	seeAll(){
		axios.get('http://localhost:3002/getRecipes')
      	.then((response)=>{
        	// console.log(response.data)
        this.setState({
          	recipes: response.data
        })
      })
	}

//search by ingridient
	handleSubmit(e){
		e.preventDefault()
		const ingredient = document.querySelector('[name="title"]').value;
		axios.post('http://localhost:3002/getRecipes',{
			data: ingredient
		}).then((response)=>{
			this.setState({
          		recipes: response.data
        	})
		})
	}

	render(){
	// var studentsArray = this.state.recipes.map((recipe, index)=>{
 //      	return (<li key={index}>{recipe.title}</li>)
 //    })
		return(
			<div>
				<h1>Click the button of your selection</h1>
				<div className="buttons">
		        	<button type="submit" className="btn" onClick={this.seeAll.bind(this)}>See All Recipes</button>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<input placeholder="search by ingridient" name="title" />
						<button type="submit" className="btn">find by title</button>
		        	</form>
		        </div>
				<ul>
					{this.state.recipes.map((recipe, index)=>{
						return (
						<div className = "element">
							<Tile recipe = {recipe}/>
						</div>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default Search;