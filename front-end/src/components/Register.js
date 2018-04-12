import React, { Component } from 'react';
import './Login.css';
import axios from 'axios';
const API = 'http://localhost:3002';

class Register extends Component{

	handleRegister(e){
		e.preventDefault();
		let email = document.querySelector('[name="email"]').value;
		let user = document.querySelector('[name="userName"]').value;
		let password = document.querySelector('[name="password"]').value;
		console.log(email, user, password)
		axios.post(`${API}/register`,{
	        email: email,
	        user: user,
	        password: password
      }).then((response)=>{console.log(response)})
	}

	render(){
		return(
			<div className="Register">
				<h1>Register In With</h1>
				<form onSubmit={this.handleRegister.bind(this)}>
					<div className="email">
						<h3>Or</h3>
						<div>
							<label>
								<h4>Email:</h4>
								<input type="email" name="email" />
							</label>
						</div>
						<div>
							<label>
								<h4>User Name:</h4>
								<input type="text" name="userName" />
							</label>
						</div>
						<div>
							<label>
								<h4>Password:</h4>
								<input type="password" name="password" />
							</label>
						</div>
						<button className="submit">Register</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Register;