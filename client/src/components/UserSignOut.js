import React, {Component} from "react";
import {Redirect} from "react-router-dom";

class UserSignOut extends Component{ 

    logOut = () => {
        window.localStorage.removeItem('FirstName')
        window.localStorage.removeItem('LastName')
        window.localStorage.removeItem('Email')
        window.localStorage.removeItem('Password')
        window.localStorage.removeItem('UserId')
        window.localStorage.removeItem('IsLoggedIn')
        window.location.assign('/UserSignIn')
        
      }
        componentDidMount() {
            this.logOut();
        }
    
        // User is redirected to "/UserSignIn" after logging out.
        render(){
            return(
                <Redirect to="/UserSignIn" />
            )
        }
} 

export default UserSignOut;