import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import "./signUp.css";
// import facebook from '../images/facebook.png';
import google from '../images/google.png';
// import smoothies from '../smoothie-recipes.jpg';
const API = 'http://localhost:3002';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      isValid: "",
      isRegistered: false
    };
  }

  validateForm() {
    return this.state.username.length > 2 && this.state.email.length > 4 && this.state.password1.length > 3 && (this.state.password1 === this.state.password2);
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let username = this.state.username.charAt(0).toUpperCase()+this.state.username.slice(1);//to make first letter is upper case
    let email = this.state.email;
    let password = this.state.password1;
    console.log(username, email, password);
    axios.post(`${API}/register`,{
        username: username,
        email: email,
        password: password
      }).then((response)=>{
        console.log(response)
        //now, if login success we need to update navbar - remove register
        //substitute it with Favorites
        if(response.status === 200 && response.data.result === 'success'){
          console.log('succesfuly registered')
          this.setState({//reset the fields
            username: "",
            email: "",
            password1: "",
            password2: "",
            isRegistered: true
          })
        }else if(response.status === 200 && response.data.result === 'alreadyIn'){
          console.log('already registered')
          this.setState({//reset the fields
            username: "",
            email: "",
            password1: "",
            password2: "",
            isRegistered: true
          })
        }else{
          console.log('something went wrong')
        }
      })
  }

  render() {

    if (this.state.isRegistered){
        this.props.history.push('/login')
    }

    return (
      <div className="signUp">
        <h1>Sign Up Form</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel className="font">username</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              placeholder = "choose your username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel className="font">email</ControlLabel>
            <FormControl
              type="email"
              placeholder = "enter your email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password1" bsSize="large">
            <ControlLabel className="font">Password</ControlLabel>
            <FormControl
              placeholder = "your password is here"
              value={this.state.password1}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="large">
            <ControlLabel className="font">Password</ControlLabel>
            <FormControl
              placeholder = "retype your password here"
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            bsStyle = "success"
            className = "social"
            block
            bsSize="large"
            disabled={!this.validateForm()}//button is only enabled when the right info in the fields
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;