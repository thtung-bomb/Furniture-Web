import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Register from '../../Register/Register';

function Header({ isLoggedIn, userName, handleLogout, handleLogin }) {

    const [isLoginOpen, setLoginOpen] = useState(false);

    // Open and Close Quotation Form
    const toggleLogin = () => {
        setLoginOpen(!isLoginOpen);
    };

    console.log(isLoggedIn);

    return (

        // Header
        <header className="header">
            {/* Navigate */}
            <div className="grid">
                <div className="header__navbar">
                    {/* Logo Web */}
                    <div className="header__navbar-logo">
                        <Link className="logo-link" to="/">
                            <img
                                className="header__navbar-logo--img"
                                src="../../../src/assets/image/Clip path group.svg"
                                alt="Furniture logo"
                            />
                            <span className="header__navbar-logo--name">Furniture</span>
                        </Link>
                    </div>
                    {/* End Logo Web */}

                    <nav className="header__navbar-navPage">
                        <ul>
                            {/* About Us */}
                            <li className="dropdown-container">
                                <Link to='/about-us' className="header__navbar-navPage--button">About Us</Link>
                            </li>
                            {/* End About Us */}

                            {/* Services */}
                            <li className="dropdown-container">
                                <a to="service" className="header__navbar-navPage--button">
                                    Services
                                    <span className="fa-solid fa-angle-down icon-down"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    {/* Living room */}
                                    <li className="details-menu">
                                        <Link to="/services/livingroom">Living Room</Link>
                                    </li>
                                    {/* End living room */}

                                    {/* Bed Room */}
                                    <li className="details-menu">
                                        <Link to="/bed-room">Bed Room</Link>
                                    </li>
                                    {/* End Bed Room */}
                                    <li className="details-menu">
                                        <Link to="/dining-room">Dining Room</Link>
                                    </li>

                                    {/* Rest Room */}
                                    <li className="details-menu">
                                        <Link to="/rest-room">Rest Room</Link>
                                    </li>
                                    {/* End Rest Room */}

                                    {/* Family Room */}
                                    <li className="details-menu">
                                        <Link to="/Details/FamilyRoomDetails.html">Family Room</Link>
                                    </li>
                                    {/* End Family Room */}

                                    {/* Work Room */}
                                    <li className="details-menu">
                                        <Link to="/Details/WorkRoomDetails.html">Work Room</Link>
                                    </li>
                                    {/* End Work Room */}
                                </ul>
                            </li>
                            {/* End Services */}

                            {/* Blog */}
                            <li className="dropdown-container">
                                <Link to={'/blog'} className="header__navbar-navPage--button">Blog</Link>
                            </li>
                            {/* End Blog */}
                        </ul>
                    </nav>


                    {/* Search */}
                    <div className="header__search">
                        <div className="header__search-input-wrap">
                            <input
                                type="text"
                                className="header__search-input"
                                placeholder="Search..."
                            />
                            <button className="header__search-btn">
                                <i className="fas fa-search header__search-btn-icon"></i>
                            </button>
                        </div>
                    </div>
                    {/* End Search */}


                    {/* Quote Button */}
                    <div className="header__quote">
                        {isLoggedIn ? (
                            <div>
                                <span className="user-name">{userName}</span>
                                <button handleLogout={handleLogout}>Log out</button>
                            </div>
                        ) : (
                            <div>
                                <button className="header__quote-button" onClick={toggleLogin}>Quote</button>
                                {
                                    isLoginOpen && <Register onLogin={toggleLogin} handleLogin={handleLogin} />
                                }
                            </div>
                        )}
                        {/* End Register Form */}
                    </div>
                    {/* End Quote Button */}

                    {/* Header mobile screen */}
                    <div className="header__mobile-menu">
                        <nav className="header__mobile-menu--menu-list">

                            {/* Hambugur Menu */}
                            <i className="fa-solid fa-bars header__mobile-menu--menu-icon"></i>
                            {/* End Hambugur Menu */}

                            {/* About Us */}
                            <Link className="b" to="/about-us">About us</Link>
                            {/* End About Us */}

                            {/* Services */}
                            <Link className="b" to="WebPage/Services/ServicePage.html">Services</Link>
                            {/* End Services */}

                            {/* Blog */}
                            <Link to='/blog' className="b" >Blogs</Link>
                            {/* End Blog */}

                            {/* Search */}
                            <div className="menu__search-box">
                                <div className="menu__search-wrap">
                                    <input
                                        type="text"
                                        className="menu__search-input"
                                        placeholder="Search..."
                                    />
                                    <button className="menu__search-btn">
                                        <i className="fas fa-search menu__search-btn-icon"></i>
                                    </button>
                                </div>
                            </div>
                            {/* End Search */}
                        </nav>
                    </div>
                    {/* End Header mobile screen */}
                </div>
            </div>
            {/* End Navogate */}
        </header>
        // End Header
    )
}

export default Header