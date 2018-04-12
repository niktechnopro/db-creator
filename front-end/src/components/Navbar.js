import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MyNavbar extends Component {
	constructor(){
		super();
		this.state = ({
			value: '',
			placeholder: 'search by ingredient'
		})
	}

	searchByIngedient(e){
		e.preventDefault();
		const ingredient = document.querySelector('[name="ingredient"]').value.trim();
		if (ingredient != ''){
			document.querySelector('form').reset(); //to reset the form
			this.props.ingrSearch(ingredient);
		}else{
			this.setState({
				placeholder: 'refine your search'
			})
		}
	}

	render() {
	return (
		<div id="navbar">
			<nav id="title">
				<Link to="/" style={{ textDecoration: 'none' }}><p>Smoothie Recipes</p></Link>
			</nav>
			<nav id="middle">
				<p onClick = {()=>{this.props.ingrSearch('showAll')}}>See All Recipes</p>
				<form onSubmit={this.searchByIngedient.bind(this)}>
					<input placeholder={this.state.placeholder} name="ingredient" />
					<button type="submit" className="btn">find by title</button>
		        </form>
			</nav>
			<nav className="navigation">
				<Link to="/login" style={{ textDecoration: 'none' }}><p>Login</p></Link>
				<Link to="/register" style={{ textDecoration: 'none' }}><p>Register</p></Link>
			</nav>
		</div>
	);
  }
}

export default MyNavbar;
<p onClick = {()=>{this.props.backHome()}}>Smoothie Recipes</p>
