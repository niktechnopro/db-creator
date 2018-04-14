import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class MyNavbar extends Component {
	constructor(){
		super();
		this.state = ({
			value: '',
			placeholder: 'search by ingredient'
		})
	}

	render() {
/*		<nav id="middle">
<p onClick = {()=>{this.props.ingrSearch('showAll')}}>See All Recipes</p>
	<form onSubmit={this.searchByIngedient.bind(this)}>
		<input placeholder={this.state.placeholder} name="ingredient" />
		<button type="submit" className="btn">find by title</button>
    </form>
</nav>
*/	console.log(this.props)
	return (
		<div id="navbar">
			<nav id="title">
				<Link to="/" style={{ textDecoration: 'none' }}><p>Smoothie Recipes</p></Link>
			</nav>
			<nav id="middle">
				{(this.props.isUser) &&  <p>Hello {this.props.userName}</p>}
			</nav>
			<nav className="navigation">
				{(!this.props.isUser) && <Link to="/login" style={{ textDecoration: 'none' }}><p>Login</p></Link>}
				{(this.props.isUser) ? 
					<Link to="/favorites" style={{ textDecoration: 'none' }}><p onClick={()=>{this.props.ingrSearch('favorites')}}>Favorites</p></Link> :
					<Link to="/register" style={{ textDecoration: 'none' }}><p>Sign Up</p></Link>
					
				}
			</nav>
		</div>
	);
  }
}

export default MyNavbar;