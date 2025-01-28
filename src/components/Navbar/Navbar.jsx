import React from 'react';
import { ReactComponent as Profile }from '../../assets/Profile.svg';
import "./styles.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">Yummie Mart</a>
            </div>

            <div className="navbar-user d-flex align-items-center" style={{gap: "10px"}}> 
              <Profile width={40} height={40}/>
                <p className='mb-0'>{localStorage.getItem("userName")}</p>
            </div>
        </nav>
    );
};

export default Navbar;