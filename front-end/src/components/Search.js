import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import Tile from './Tile';
import axios from 'axios';
import RecipeModal from './recipeModal';
const API = 'http://localhost:3002';


class Search extends Component{
	constructor(){
		super();
		this.state = ({
			recipes: [],
			message: '',
			placeholder: 'search by ingredient',
			selected: false,
			modalStatus: false,
			recipe: ''
		})
		this.closeModal = this.closeModal.bind(this)
		this.openModal = this.openModal.bind(this)
	}

//to see all recipes
	componentDidMount(){
		console.log('this.props: ', this.props)
		let email = this.props.email;
		if (this.props.favorites === 'favorites'){
			console.log('retrieving favorites with ', email)
			axios.post(`${API}/favorites`, {
				data: email
			})
      		.then((response)=>{
      		console.log(response)
        	this.setState({
          		recipes: response.data,
          		message: `You selected ${response.data.length} recipes as your favorites`
        		})
			})
		}else{
			axios.get(`${API}/getRecipes`)
	      	.then((response)=>{
	        	// console.log(response.data)
	        this.setState({
	          	recipes: response.data,
	          	message: `There are ${response.data.length} recipes in database`
	        	})
      		})
	    }
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

	openModal(info){
		console.log('open modal', info);
		this.setState({
			modalStatus: true,
			recipe: info
		})
	}

	closeModal(){
		console.log('close modal')
		this.setState({
			modalStatus: false
		})
	}


	render(){
		var useremail = this.props.useremail;
		console.log(this.props)
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
						{this.state.recipes.map((recipe, index)=>{
							return (
							<div className = "element" key={index}>
								<Tile 
								open = {this.openModal}
								recipe = {recipe} 
								user = {useremail} 
								selected={this.state.selected}
								/>
							</div>
							)
						})}
				</div>	
				<RecipeModal open = {this.state.modalStatus} recipe = {this.state.recipe} close = {this.closeModal} />
			</div>
		)
	}
}

export default Search;
