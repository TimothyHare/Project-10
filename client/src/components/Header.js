import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => 

{
    if(JSON.parse(localStorage.getItem('IsLoggedIn'))){
       return ( 
        <div className="header"> 
            <div className="bounds">
                <NavLink to='/' className="header--logo">Courses</NavLink>
              <nav>
                  <span>{`Welcome ${localStorage.getItem('FirstName')}  ${localStorage.getItem('LastName')}`}!</span><Link className='signup' to={'/UsersignOut'}>Sign out</Link>
                </nav>
            </div>
         </div> 
      ) 
    } else {
        return ( 
        <div className="header"> 
            <div className="bounds">
                <NavLink to='/' className="header--logo">Courses</NavLink>
                    <nav>
                    <Link className="signin" to={'/UserSignIn'}>Sign In</Link>
                    <Link className="signup" to={'/UserSignUp'}>Sign Up</Link>
                    </nav>
            </div>
        </div>
      )
    }
};

export default Header 