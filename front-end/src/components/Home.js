import React, { Component } from 'react';
import Login from './Login';
import smoothies from '../smoothie-recipes.jpg';


class Home extends Component{
	render() {
		
		return (
			<div>
				<h1>Home Page here</h1>
				<img className="masters" src={smoothies} alt="The Smoothies"/>
				<Login />
			</div>
		)
	}
}

export default Home;