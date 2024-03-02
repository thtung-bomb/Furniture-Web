import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="grid">
                <div className="header__navbar">
                    <div className="header__navbar-logo">
                        <a className="logo-link" href="/homePage.html">
                            <img
                                className="header__navbar-logo--img"
                                src="../../../src/assets/image/Clip path group.svg"
                                alt="Furniture logo"
                            />
                            <span className="header__navbar-logo--name">Furniture</span>
                        </a>
                    </div>
                    <nav className="header__navbar-navPage">
                        <ul>
                            <li className="dropdown-container">
                                <a href="#" className="header__navbar-navPage--button">About Us</a>
                            </li>
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
                            <li className="dropdown-container">
                                <a href="/WebPage/WebBlog/Blog.html" className="header__navbar-navPage--button">Blog</a>
                            </li>
                        </ul>
                    </nav>

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
                    <div className="header__quote">
                        <button className="header__quote-button" id="quoteButton">Quote</button>
                        <div className="login-card" id="loginCard" >
                            <button className="close" id='close'>close</button>
                            <form className="login-form" action="">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" />
                                <label htmlFor="telephone">Telephone contact</label>
                                <input type="text" id="telephone" />
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" />
                                <button className="regis-button" id="registerButton">Register For Quote</button>
                            </form>
                        </div>
                    </div>

                    <div className="header__mobile-menu">
                        <nav className="header__mobile-menu--menu-list">
                            <i className="fa-solid fa-bars header__mobile-menu--menu-icon"></i>
                            <a className="b" href="/WebPage/AboutUsPage/AboutUsPage.html">About us</a>
                            <a className="b" href="WebPage/Services/ServicePage.html">Services</a>
                            <a className="b" >Blogs</a>
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
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header