import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import SlickSlider from './components/SlickSlider';
import Search from './components/Search';
// import Search from './components/Search1';
import MyNavbar from './components/Navbar';
import Carousel from './components/Carousel';
import './App.css';

class App extends Component {

	constructor(){
		super();
		this.state = ({
			message: '',
			recipes: []
		})
	}

	searchTerm(ingredient){
		console.log(ingredient); //ingredient passed from Navbar
		if (ingredient != 'showAll'){
			axios.post('http://localhost:3002/getRecipes',{
				data: ingredient
			}).then((response)=>{
				let message = this.state.message;
				if (response.data.length != 0){
					message = `There are ${response.data.length} results for '${ingredient}'`
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
			axios.get('http://localhost:3002/getRecipes')
      		.then((response)=>{
        	// console.log(response.data)
        	this.setState({
          		recipes: response.data,
          		message: `There are ${response.data.length} recipes in database`
        		})
      		})
		}
	}

	home(){
		console.log('home - back to Home Page')
		this.setState({
      		message: ''
        })
	}

	//we are going to use turnary operator to make code more clean
	render() {
		console.log(this.state.message) // this is our condition which dictates what renders on the screen
	return (
		<Router>
        	<div className="App">
          		<MyNavbar ingrSearch = {this.searchTerm.bind(this)} backHome = {this.home.bind(this)}/>
          		{(this.state.message.length === 0) ? <Carousel /> : <Search recipes={this.state.recipes} message={this.state.message} />}
        	</div>
      </Router>
		);
	}
}


export default App;

/*
<div className="app-body">
            		{(this.state.ingredient.length == 0) && <Route exact path="/" component={Carousel} />}
            		<div className="container-fluid">
	              		<Route exact path="/allrecipes" component={Search} />
            		</div>
         		</div>
*/
// <div className="pages">
					// 	<Route exact path="/" component={Home} />
					// </div>