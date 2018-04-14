import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Tile from './Tile';
import axios from 'axios';
const API = 'http://localhost:3002';


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

	componentDidMount(){
		axios.get(`${API}/getRecipes`)
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
		axios.post(`${API}/getRecipes`,{
			data: ingredient
		}).then((response)=>{
			let message = this.state.message;
			if (response.data.length != 0){
				message = `There are ${response.data.length} results for ${ingredient}`
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
		var useremail = this.props.useremail;
		return(
			<div className="offset">
				<h1>Let's find you a Smoothie Recipe</h1>
				<div className="buttons">
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
								<Tile recipe = {recipe} user = {useremail} />
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
