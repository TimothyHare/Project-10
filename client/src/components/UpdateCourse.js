//Johnny Louifils helped me create this file
import React from 'react';
import  axios  from "axios";

class UpdateCourse extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
      course: [],
      user: [],
      title: '', 
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: []
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
  }

  change = (event) => {
      this.setState({
      [event.target.name]: event.target.value
      })
  }
  handleSubmit = (e) => {
    const {match: { params }} = this.props;
    e.preventDefault();

      axios ({
          method: 'put',
          url: `http://localhost:5000/api/courses/${params.id}`,
          auth: {
            username: window.localStorage.getItem('Email'),
            password: window.localStorage.getItem('Password')
         },
          data: {
              title: this.state.title,
              description: this.state.description,
              estimatedTime: this.state.estimatedTime,
              materialsNeeded: this.state.materialsNeeded
              }
      }).then(response => { 
        if (response.status === 204) {
          alert(" Update Succesful!");
          this.props.history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.log("CATCH =", err.response.data.message);
        this.setState({
          errors: err.response.data.message
        });
      });
  };

  handleCancel = (evt) => {
      var { history } = this.props;
      var { course } = this.state;
      evt.preventDefault();
      history.push(`/courses/${course._id}`)
  }
  componentDidMount() {
      const {match: { params }} = this.props;
      axios
    .get(`http://localhost:5000/api/courses/${params.id}`)
    .then(results => {
      this.setState({
        course: results.data,
        user: results.data.user
      });
    });

  }

  render() {
    
 const errors = this.state.errors; 
 //const errorList = errors.map((error) =>
  // <li key={error.toString()}>{error}</li>);
   const { course, user } = this.state;

    return ( 
     <div>
     <hr />
     <div className="bounds course--detail">
       <h1>Update Course</h1>
       <div className="validation-errors">
           <ul>{errors}</ul>
         </div>
       <div>
         <form onSubmit={ this.handleSubmit}>
           <div className="grid-66">
             <div className="course--header">
               <h4 className="course--label">Course</h4>
               <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={course.title}  onChange={e => this.change(e)} /></div>
               <p>By {user.firstName} {user.lastName}</p>
             </div>
             <div className="course--description">
               <div><textarea id="description" name="description"  placeholder={this.state.course.description} onChange={e => this.change(e)}/> </div>
             </div>
           </div>
           <div className="grid-25 grid-right">
             <div className="course--stats">
               <ul className="course--stats--list">
                 <li className="course--stats--list--item">
                   <h4>Estimated Time</h4>
                   <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={this.state.course.estimatedTime} onChange={e => this.change(e)} /></div>
                 </li>
                 <li className="course--stats--list--item">
                   <h4>Materials Needed</h4>
                   <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder={this.state.course.materialsNeeded}  onChange={e => this.change(e)} /></div>
                 </li>
               </ul>
             </div>
           </div>
           <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.handleCancel}>Cancel</button></div>
         </form>
       </div>
     </div>
   </div> 
  );
 } 
}

export default UpdateCourse;