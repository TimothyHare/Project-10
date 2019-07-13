//Johnny louifils walked me through creating this

import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; 
import ReactMarkdown from "react-markdown"

class CourseDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
    
          course: [],
          user: []
        };
        this.handleDelete = this.handleDelete.bind(this); 
      }

      componentDidMount() {
        const {
          match: { params }
        } = this.props;  
      
        axios
          .get(`http://localhost:5000/api/courses/${params.id}`)
          .then(results => {
    
            this.setState({
    
              course: results.data,
              user: results.data.user
            });
    
          });
      }

      handleDelete() {
        const {
          match: { params },
          history
        } = this.props;
    
        axios
          .delete(`http://localhost:5000/api/courses/${params.id}`, {
            auth: {
              username: window.localStorage.getItem("Email"),
              password: window.localStorage.getItem("Password")
            }
          })
          .then(() => {
            history.push("/");
          });
      }

      render() {
        const { course, user } = this.state;
        const isLoggedIn = localStorage.getItem("IsLoggedIn");
        const UserId = JSON.parse(localStorage.getItem("UserId"));
        
        return (//JSX inside
          <div>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    {(isLoggedIn && user._id === UserId) ? ( 
                      <span>
                        <NavLink
                          to={`/courses/${course._id}/update`}
                          className="button"
                        >
                          Update Course
                        </NavLink>
                        <NavLink
                          to={"#"}
                          className="button"
                          onClick={this.handleDelete}
                        >
                          Delete Course
                        </NavLink>
                      </span>
                    ) : null} 
                  </span>
                  <NavLink
                    to="/"
                    className="button button-secondary"
                    href="index.html"
                  >
                    Return to List
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
                <p>
                  This course was created by: {user.firstName} {user.lastName}
                </p>
                <div className="course--description">
                   <ReactMarkdown source={course.description} /> 
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime} hours</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                       <ReactMarkdown source={` * ${course.materialsNeeded}`} /> 
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      } 

}

export default CourseDetail;