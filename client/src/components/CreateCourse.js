//Johnny Louifils helped me create this

import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "",
            errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    change = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault(); // prevent page load
        if (this.state.description === '' || this.state.title === '') {
          this.setState({
            errors: 'Course and Description are required!'
          })
          // alert('Course and Description are required!');
        } else {
          axios({
              method: 'post',
              url: 'http://localhost:5000/api/courses',
              auth: {
                username: window.localStorage.getItem("Email"),
                password: window.localStorage.getItem("Password")
              },
              data: {
                  title: this.state.title,
                  description: this.state.description,
                  estimatedTime: this.state.estimatedTime,
                  materialsNeeded: this.state.materialsNeeded
                  }  
              })
              .then(alert('course created!'))
              .then( ()=> {
                  const { history } =this.props;
                  history.push('/')
              })
              .catch(err => {
                this.setState({ 
                  errors: err.response.data.errors
                });
                console.log(err.response.data.errors);
              });
            }
        };
        
        render() {
          const errors = this.state.errors;
          // const errorList = errors.map(error => (
          //   <li key={error.toString()}>{error}</li>
          // ));
      
          return (
            <div>
              <hr />
              <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                  <div>
                    <div>
                      <div className="validation-errors">
                        <ul>{errors}</ul>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>{" "}
                        <div>
                          <input
                            value={this.state.title}
                            onChange={e => this.change(e)}
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            placeholder="Course title..."
                          />
                        </div>
                        <p>{localStorage.user}</p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            value={this.state.description}
                            onChange={e => this.change(e)}
                            id="description"
                            name="description"
                            placeholder="Course description..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                value={this.state.estimatedTime}
                                onChange={e => this.change(e)}
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                value={this.state.materialsNeeded}
                                onChange={e => this.change(e)}
                                id="materialsNeeded"
                                name="materialsNeeded"
                                placeholder="List materials..."
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                      <button className="button" type="submit">
                        Create Course
                      </button>
                      <NavLink to="/" className="button button-secondary">
                        Cancel
                      </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        }
    
}

export default CreateCourse;