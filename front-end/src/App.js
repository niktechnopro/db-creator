import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import SlickSlider from './components/SlickSlider';
import Search from './components/Search';
import MyNavbar from './components/Navbar';
import Carousel from './components/Carousel';
import Login from './components/Login';
import Register from './components/Register';
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
		}else{// this portion gets all recipes
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

	home(){ // this funvtion get back to initial screen
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
      		<MyNavbar ingrSearch = {this.searchTerm.bind(this)} backHome = {this.home.bind(this)} />
	        <div className="container-fluid">
	        	<Route exact path="/" component={Carousel} />
		        <Route exact path="/login" component={Login} />
		        <Route exact path="/register" component={Register} />
		    </div>
    	</div>   	
      </Router>
		);
	}
}


export default App;

// {(this.state.message.length === 0) ? <Carousel /> : <Search recipes={this.state.recipes} message={this.state.message} />}


