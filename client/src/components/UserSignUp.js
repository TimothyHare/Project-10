import React from 'react';
import { NavLink } from 'react-router-dom'; 
import axios from "axios";

class UserSignUp extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      errors: [],
      emailError: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this); 
  }   

  componentDidMount() {
    this.setState({emailError: null})
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password doesn't match");
    } else {
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users/',
      data: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }
      }).then(response => { 
      if (response.status === 201) {
        alert("Account Created!");
        this.props.history.push("/UserSignIn");
      } else {
        throw new Error();
      } 
    }).catch(err => {        
      console.log("CATCH =", err.response.data.error);
      this.setState({       
        errors: err.response.data.error.message,
        emailError: err.response.data.error.errmsg
      });
    }); 
  }
}

  
    change = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

   
    render() {   
      const errors = this.state.errors; 
      let emailError = '';
      // const errorList = errors.map((error) =>
      //   <li key={error.toString()}>{error}</li>);

      if (this.state.emailError != null) {
        emailError = "Email already exist in database. Please choose another!"
      } else {
        emailError = ''
      }
  
         return ( 
          <div>
          <hr />
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              <div className="validation-errors">
                <ul>{errors}</ul>
                <ul>{emailError}</ul>
              </div>
            </div>
              <div>
              <form onSubmit={this.handleSubmit}>
                <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={e => this.change(e)} /></div>
                <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={e => this.change(e)} /></div>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.change(e)} /></div>
                <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} /></div>
                <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={e => this.change(e)} /></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <NavLink to='/UserSignIn'>Click here</NavLink> to sign in!</p>
          </div>
        </div>
      </div>
       );
      }  
} 

export default UserSignUp;