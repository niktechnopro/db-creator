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

	componentDidMount(){
		this.seeAll()
	}

	render(){
		return(
			<div>
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