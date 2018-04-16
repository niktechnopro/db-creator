import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import SlickSlider from './components/SlickSlider';
import Search from './components/Search';
import MyNavbar from './components/Navbar';
//import Carousel from './components/Carousel';
import Login from './components/Login';
import Register from './components/Register';
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
			favorites: '',
			isAuthenticate: false,
			selected: undefined
		})
		this.modalHandler = this.modalHandler.bind(this)
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

	myFavorites(info){
		console.log('my favorites fired up ', info); //ingredient passed from Navbar
		this.setState({
			favorites: info
		})
	}


	userHandler(info){
		console.log('userHandler', info);
		this.setState({
			username: info.username,
			email: info.email,
			isAuthenticate: true
		})
	}

	modalHandler(){
		console.log('open modal')
		this.setState({
			selected: 'fuck you'
		})
	}


// <div className="App">
//       		<MyNavbar ingrSearch = {this.myFavorites.bind(this)} isUser={this.state.isAuthenticate} userName={this.state.username} />
// 	        {(this.state.favorites) && <Search favorites = {this.state.favorites} email = {this.state.email} /> }
// 	        <RecipeModal option = {this.state.selected} />
// 	        <div className="container-fluid view_area">
// 		        <Route path="/login" component={() => (<Login user={this.userHandler.bind(this)} />)} />
// 		        <Route path="/register" component={signUp} />
// 		        <Route path="/search" component = {() => (<Search useremail={this.state.email} />)} />
// 		    	<button type='submit' onClick = {this.modalHandler} >modal test</button>
// 		    </div>
//     	</div>

/*
 {(this.state.message.length === 0) && <Search recipes={this.state.recipes} message={this.state.message} />}
*/
// <Route exact path="/" component={Carousel} />
	//we are going to use turnary operator to make code more clean
	render() {
	return (
		<Router>
			<div className="App">
				<Search />}
    		</div>
    	</Router>   	
		);
	}
}


export default (App);




