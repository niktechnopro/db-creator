import React, { Component, Fragment } from 'react';
import axios from 'axios';
import smoothies from '../smoothie-recipes.jpg';
const API = 'http://localhost:3002/login';

class Login extends Component{
    constructor(){
        super();
        this.state = ({
            recipes: [],
            message: '',
            placeholder: 'search by ingredient'
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event.target.name)
        const formData = new FormData(event.target);
        console.log(formData)
        // axios.post(`${API}/login`, {
        //     user: formData.get('username')
        // })
        // .then(user => {
        //     console.log(user)
        //     // props.userHandler(user.data[0].username);
        //     // props.userIdHandler(user.data[0].id);
        //     // return axios.get(`${API}/${user.data[0].id}`, {
        //     //     userId: user.data[0].id
        //     // })
        // })
        // .catch(err=>console.log(err))
    }
    render(){
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit.bind(this)}>        
                    <input name="username" type="text" placeholder="Enter Username"/>
                    <button type="submit">Login</button>
                </form>
            </Fragment>
        );
    }
}

export default Login;
