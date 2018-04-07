import React, { Component } from 'react';
import Tile from './Tile';
import axios from 'axios';


class Search extends Component{
	constructor(){
		super();
		this.state = ({
			recipes: [],
			message: '',
			placeholder: 'search by ingredient'
		})
	}
//to see all recipes
	seeAll(){
		axios.get('http://localhost:3002/getRecipes')
      	.then((response)=>{
        	// console.log(response.data)
        this.setState({
          	recipes: response.data,
          	message: `There are ${response.data.length} recipes in database`
        })
      })
	}

//search by ingridient
	handleSubmit(e){
		e.preventDefault()
		const ingredient = document.querySelector('[name="title"]').value.trim();
		if (ingredient != ''){
		axios.post('http://localhost:3002/getRecipes',{
			data: ingredient
		}).then((response)=>{
			let message = this.state.message;
			if (response.data.length != 0){
				message = `There are ${response.data.length} results for your search`
		    }else if(response.data.length == 0){
		    	message = "There are no results for your search, redefine your search and try again"
			}else{
				message = ''
			}
			this.setState({
				recipes: response.data,
				message: message
				})
			})
		}else{
			this.setState({
				placeholder: 'refine your search'
			})
		}
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
						<input placeholder={this.state.placeholder} name="title" />
						<button type="submit" className="btn">find by title</button>
		        	</form>
		        </div>
		        <h2>{this.state.message}</h2>
				<div className="recipes">
					<ul>
						{this.state.recipes.map((recipe, index)=>{
							return (
							<div className = "element" key={index}>
								<Tile recipe = {recipe} />
							</div>
							)
						})}
					</ul>
				</div>	
			</div>
		)
	}
}

export default Search;