import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// import SlickSlider from './components/SlickSlider';
import Search from './components/Search';
import MyNavbar from './components/Navbar';
//import Carousel from './components/Carousel';
import Login from './components/Login';
// import Register from './components/Register';
import signUp from './components/signUp';
import './App.css';
const API = 'http://localhost:3002';

class App extends Component {

	constructor(){
		super();
		this.state = ({
			message: '',
			recipes: [],
			username: '',
			email: '',
			isAuthenticate: false
		})
	}

	searchByIngedient(e){
		e.preventDefault();
		const ingredient = document.querySelector('[name="ingredient"]').value.trim();
		if (ingredient !== ''){
			document.querySelector('form').reset(); //to reset the form
			this.props.ingrSearch(ingredient);
		}else{
			this.setState({
				placeholder: 'refine your search'
			})
		}
	}

	searchTerm(ingredient){
		console.log(ingredient); //ingredient passed from Navbar
		if (ingredient === 'showAll'){//to show all recipes
			axios.get(`${API}/getRecipes`)
      		.then((response)=>{
        	// console.log(response.data)
        	this.setState({
          		recipes: response.data,
          		message: `There are ${response.data.length} recipes in database`
        		})
      		})
      	}else if(ingredient === 'favorites'){
      		console.log('retrieve fovorites')
      	}else{
			axios.post(`${API}/getRecipes`,{
				data: ingredient
			}).then((response)=>{
				let message = this.state.message;
				if (response.data.length !== 0){
					message = `There are ${response.data.length} results for '${ingredient}'`
			    }else if(response.data.length === 0){
			    	message = "There are no results for your search, redefine your search and try again"
				}else{
					message = ''
				}
				this.setState({
					recipes: response.data,
					message: message
					})
				})
		}
	}

	//spread - makes an array of arguments passed to function

	userHandler(info){
		console.log('userHandler', info);
		this.setState({
			username: info.username,
			email: info.email,
			isAuthenticate: true
		})
	}


/*
 {(this.state.message.length === 0) ? <Carousel /> : <Search recipes={this.state.recipes} message={this.state.message} />}
*/
// <Route exact path="/" component={Carousel} />
	//we are going to use turnary operator to make code more clean
	render() {
	return (
		<Router>
    	<div className="App">
      		<MyNavbar ingrSearch = {this.searchTerm.bind(this)} isUser={this.state.isAuthenticate} userName={this.state.username} />
	        <div className="container-fluid view_area">
		        <Route path="/login" component={() => (<Login user={this.userHandler.bind(this)} />)} />
		        <Route path="/register" component={signUp} />
		        <Route path="/search" component = {() => (<Search useremail={this.state.email} />)} />
		    </div>
    	</div>   	
      </Router>
		);
	}
}


export default (App);


