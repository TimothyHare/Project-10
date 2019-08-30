import React from "react";
import {Redirect} from "react-router-dom";

class UserSignOut extends React.Component{ 

    logOut = () => {
        window.localStorage.removeItem('FirstName')
        window.localStorage.removeItem('LastName')
        window.localStorage.removeItem('Email')
        window.localStorage.removeItem('Password')
        window.localStorage.removeItem('UserId')
        window.localStorage.removeItem('IsLoggedIn')
        window.location.assign('/')
        
      }
        componentDidMount() {
            this.logOut();
        }
    
        // User is redirected to "/Courses" after logging out.
        render(){
            return(
                <Redirect to="/" />
            )
        }
} 

export default UserSignOut;