import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Send } from '@material-ui/icons';//better way if want to
import validate from '../utilities/validators';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    fontSize: '20px',
    width: 300,
  },
  button: {
    width: 200,
    margin: theme.spacing.unit,
  },
  Icon: {
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  }
});


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: ' ',
    passwordError: ' ',
    loginError:''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  resetHelper = (field) => (e) => {
    e.preventDefault();
    switch(field){
      case('email'):
        this.setState({email: ''})
        break
      case('password'):
        this.setState({password: ''})
        break
    }
  }

  validate = () => {
    //let's validate that this is an email
    const emailErr = validate.isEmail(this.state.email)
    //let's validate password
    let isError = false;
    let errors = {
      emailError: ' ',
      passwordError: ' '
    };
    const passwordError = validate.isPassword(this.state.password)
    console.log(emailErr, passwordError)
    if(!emailErr){
      isError = true
      errors.emailError = 'Requires valid email'
    }
    if(!passwordError){
      isError = true
      errors.passwordError = 'Must have at least 1 capital letter and number'
    }
    this.setState({
      ...this.state,//means - keep the same state for everything but next options
      ...errors
    })
    console.log(isError)
    return isError;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const error = this.validate()
    if (!error){
      console.log('proceed')
    }
  }

  render() {
    console.log(this.state)
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Typography variant="title" gutterBottom>
          Login Form
        </Typography>
        <TextField
          required={true}
          id="email"
          required={true}
          value={this.state.email}
          label="enter your email here"
          placeholder="email you registered with"
          className={classes.textField}
          error={(this.state.emailError === ' ') ? false : true}
          onChange={this.handleChange('email')}
          helperText={this.state.emailError}
          onFocus = {this.resetHelper('email')}
        />
        <br />
        <TextField
          required={true}
          id="password"
          required={true}
          type="password"
          value={this.state.password}
          label="enter your password here"
          placeholder="password you registered with"
          className={classes.textField}
          error={(this.state.passwordError === ' ') ? false : true}
          onChange={this.handleChange('password')}
          helperText={this.state.passwordError}
          onFocus = {this.resetHelper('password')}
        />
        <Button variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={this.onSubmit}
          >
          Login
          <Send />
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);