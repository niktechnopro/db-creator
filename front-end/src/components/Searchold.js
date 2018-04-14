import React, { Component } from 'react';
import Tile from './Tile';


class Search extends Component{


	render(){
		console.log(this.props)
		

		return(
			<div>
		        <h2>{this.props.message}</h2>
				<div className="recipes">
					<ul>
						{this.props.recipes.map((recipe, index)=>{
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