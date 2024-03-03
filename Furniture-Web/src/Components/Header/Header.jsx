import React, { useState } from 'react';
import './Header.css';

function Header() {

    const [isLoginOpen, setLoginOpen] = useState(false);

    // Open and Close Quotation Form
    const toggleLogin = () => {
        setLoginOpen(!isLoginOpen);
    };

    return (

        // Header
        <header className="header">
            {/* Navogate */}
            <div className="grid">
                <div className="header__navbar">
                    {/* Logo Web */}
                    <div className="header__navbar-logo">
                        <a className="logo-link" href="">
                            <img
                                className="header__navbar-logo--img"
                                src="../../../src/assets/image/Clip path group.svg"
                                alt="Furniture logo"
                            />
                            <span className="header__navbar-logo--name">Furniture</span>
                        </a>
                    </div>
                    {/* End Logo Web */}

                    <nav className="header__navbar-navPage">
                        <ul>
                            {/* About Us */}
                            <li className="dropdown-container">
                                <a href="#" className="header__navbar-navPage--button">About Us</a>
                            </li>
                            {/* End About Us */}

                            {/* Services */}
                            <li className="dropdown-container">
                                <a href="WebPage/Services/ServicePage.html" className="header__navbar-navPage--button">
                                    Services
                                    <span className="fa-solid fa-angle-down icon-down"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="details-menu">
                                        <a href="/Details/LivingRoomDetails.html">Living Room</a>
                                    </li>
                                    <li className="details-menu">
                                        <a href="/Details/BedRoomDetails.html">Bed Room</a>
                                    </li>
                                    <li className="details-menu">
                                        <a href="/Details/DiningRoomDetails.html">Dining Room</a>
                                    </li>
                                    <li className="details-menu">
                                        <a href="/Details/RestRoomDetails.html">Rest Room</a>
                                    </li>
                                    <li className="details-menu">
                                        <a href="/Details/FamilyRoomDetails.html">Family Room</a>
                                    </li>
                                    <li className="details-menu">
                                        <a href="/Details/WorkRoomDetails.html">Work Room</a>
                                    </li>
                                </ul>
                            </li>
                            {/* End Services */}

                            {/* Blog */}
                            <li className="dropdown-container">
                                <a href="/WebPage/WebBlog/Blog.html" className="header__navbar-navPage--button">Blog</a>
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
                        <button className="header__quote-button" id="quoteButton" onClick={toggleLogin}>Quote</button>

                        {/* Login Form */}
                        {isLoginOpen && <div className="login-card">
                            <button className="close" id='close' onClick={toggleLogin}>close</button>
                            <form className="login-form" action="">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" />
                                <label htmlFor="telephone">Telephone contact</label>
                                <input type="text" id="telephone" />
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" />
                                <button className="regis-button" id="registerButton">Register For Quote</button>
                            </form>
                        </div>}
                        {/* End Login Form */}

                    </div>
                    {/* End Quote Button */}


                    {/* Header mobile screen */}
                    <div className="header__mobile-menu">
                        <nav className="header__mobile-menu--menu-list">

                            {/* Hambugur Menu */}
                            <i className="fa-solid fa-bars header__mobile-menu--menu-icon"></i>
                            {/* End Hambugur Menu */}

                            {/* About Us */}
                            <a className="b" href="/WebPage/AboutUsPage/AboutUsPage.html">About us</a>
                            {/* End About Us */}

                            {/* Services */}
                            <a className="b" href="WebPage/Services/ServicePage.html">Services</a>
                            {/* End Services */}

                            {/* Blog */}
                            <a className="b" >Blogs</a>
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