import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
// import facebook from '../images/facebook.png';
import google from '../images/google.png';
// import smoothies from '../smoothie-recipes.jpg';
const API = 'http://localhost:3002';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isValid: "",
      isAuthenticated: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 3;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    this.setState({ //reseting values in the field
      email: "",
      password: "",
      isAuthenticated: ''
    })
    console.log(email, password);
    axios.post(`${API}/login`,{
        email: email,
        password: password
      }).then((response)=>{
        console.log(response)
        //now, if login success we need to update navbar - remove register
        //substitute it with Favorites
        if(response.status === 200 && response.data.login === 'success'){
          console.log('user exists and succesfuly logged in')
          this.setState({
            isAuthenticated: true
          })
          let user = {username: response.data.username, email: response.data.email}
          this.props.user(user)//passed to App.js handleUser
        }else if(response.status === 200 && response.data.login === 'badlogin'){
          console.log('redirect user to register page')
        }else{
          console.log('something went wrong')
        }
      })
  }

  render() {
    return (
      <div className="Login">
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel className="font">Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder = "enter your email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel className="font">Password</ControlLabel>
            <FormControl
              placeholder = "your password is here"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            bsStyle = "primary"
            className = "social"
            block
            bsSize="large"
            disabled={!this.validateForm()}//button is only enabled when the right info in the fields
            type="submit"
          >
            Login
          </Button>
        </form>
        <h2>Sign In with your social media account</h2>
        <div className="googleface">
          <span className="social"><img className="media" src={google}></img></span>
        </div>
        {(this.state.isAuthenticated) && (<Redirect to={'/search'} />)}
      </div>
    );
  }
}

export default Login;