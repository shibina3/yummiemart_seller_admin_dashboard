import React from 'react';
import "./styles.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">YummyMart</a>
            </div>

            <div className="navbar-user">
                <p>Abdul rahman</p>
            </div>
        </nav>
    );
};

export default Navbar;