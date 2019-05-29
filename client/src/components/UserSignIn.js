import React from 'react';
import { NavLink } from 'react-router-dom'; 

class UserSignIn extends Component{ 

    render() {
        return ( 
         <div>
       <hr/>
       <div className="bounds"> 
         <div className="grid-33 centered signin">
           <h1>Sign In</h1>
           <div>
             <form onSubmit={this.handleSubmit}>
               <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={e => this.change(e)}  /></div>
               <div><input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={e => this.change(e)} /></div>
               <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><NavLink to='/' className="button button-secondary">Cancel</NavLink></div>
             </form>
           </div>
           <p>&nbsp;</p>
           <p>Don't have a user account? <NavLink to='/UserSignUp'>Click here</NavLink> to sign up!</p>
         </div>
       </div> 
     </div>
     )
   } 
}

export default UserSignIn;