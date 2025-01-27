import React from 'react';
import "./styles.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">Yummie Mart</a>
            </div>

            <div className="navbar-user">
                <p>{localStorage.getItem("userName")}</p>
            </div>
        </nav>
    );
};

export default Navbar;