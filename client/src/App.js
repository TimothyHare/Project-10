//Johnny Louifils helped me complete this. 

import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./global.css";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute"
import UserSignOut from "./components/UserSignOut";


class App extends Component {
constructor() {
  super();
this.state = {};
this.signIn = this.signIn.bind(this);
}

//credited:https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
//credited:https://medium.com/technoetics/create-basic-login-forms-using-create-react-app-module-in-reactjs-511b9790dede
signIn(userInfo) {
  axios.get("http://localhost:5000/api/users", {
    auth: {
      username: userInfo.emailAddress,
      password: userInfo.password
    }
  }).then(results => { console.log(results.data)
    window.localStorage.setItem('FirstName',results.data.firstName)
    window.localStorage.setItem('LastName', results.data.lastName)
    window.localStorage.setItem('Email',userInfo.emailAddress)
    window.localStorage.setItem('Password',userInfo.password)
    window.localStorage.setItem('UserId', JSON.stringify(results.data._id))
    window.localStorage.setItem('IsLoggedIn', JSON.stringify(true))
    window.location.assign('/')
  })

}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header  />
          <Switch>
            <Route exact path="/" component={Courses} />
            <PrivateRoute path="/courses/create"  component={CreateCourse} /> 
            <PrivateRoute path="/courses/:id/update" component={UpdateCourse} /> 
            <Route exact path="/courses/:id" component={CourseDetail} />
            <Route exact path="/UsersignIn" component={() => <UserSignIn  signIn={this.signIn}/>} /> 
            <Route exact path="/UserSignUp" component={UserSignUp} />
            <Route exact path="/UserSignOut" component={UserSignOut} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
