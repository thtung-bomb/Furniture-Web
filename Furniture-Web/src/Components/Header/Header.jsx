import React from 'react';
import './Header.css';

function Header() {
    return (
        <header class="header">
            <div class="grid">
                <div class="header__navbar">
                    <div class="header__navbar-logo">
                        <a class="logo-link" href="/homePage.html">
                            <img
                                class="header__navbar-logo--img"
                                src="/assets/img/Clip path group.svg"
                                alt="Furniture logo"
                            />
                            <span class="header__navbar-logo--name">Furniture</span>
                        </a>
                    </div>
                    <nav class="header__navbar-navPage">
                        <ul>
                            <li class="dropdown-container">
                                <a href="/WebPage/AboutUsPage/AboutUsPage.html" class="header__navbar-navPage--button">About Us</a>
                            </li>
                            <li class="dropdown-container">
                                <a href="WebPage/Services/ServicePage.html" class="header__navbar-navPage--button">
                                    Services
                                    <span class="fa-solid fa-angle-down icon-down"></span>
                                </a>
                                <ul class="dropdown-menu">
                                    <li class="details-menu">
                                        <a href="/Details/LivingRoomDetails.html">Living Room</a>
                                    </li>
                                    <li class="details-menu">
                                        <a href="/Details/BedRoomDetails.html">Bed Room</a>
                                    </li>
                                    <li class="details-menu">
                                        <a href="/Details/DiningRoomDetails.html">Dining Room</a>
                                    </li>
                                    <li class="details-menu">
                                        <a href="/Details/RestRoomDetails.html">Rest Room</a>
                                    </li>
                                    <li class="details-menu">
                                        <a href="/Details/FamilyRoomDetails.html">Family Room</a>
                                    </li>
                                    <li class="details-menu">
                                        <a href="/Details/WorkRoomDetails.html">Work Room</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown-container">
                                <a href="/WebPage/WebBlog/Blog.html" class="header__navbar-navPage--button">Blog</a>
                            </li>
                        </ul>
                    </nav>

                    <div class="header__search">
                        <div class="header__search-input-wrap">
                            <input
                                type="text"
                                class="header__search-input"
                                placeholder="Search..."
                            />
                            <button class="header__search-btn">
                                <i class="fas fa-search header__search-btn-icon"></i>
                            </button>
                        </div>
                    </div>
                    <div class="header__quote">
                        <button class="header__quote-button" id="quoteButton">Quote</button>
                        <div class="login-card" id="loginCard" >
                            <button class="close" id='close'>close</button>
                            <form class="login-form" action="">
                                <label for="username">Username</label>
                                <input type="text" id="username" />
                                <label for="telephone">Telephone contact</label>
                                <input type="text" id="telephone" />
                                <label for="fullName">Full Name</label>
                                <input type="text" id="fullName" />
                                <button class="regis-button" id="registerButton">Register For Quote</button>
                            </form>
                        </div>
                    </div>

                    <div class="header__mobile-menu">
                        <nav class="header__mobile-menu--menu-list">
                            <i class="fa-solid fa-bars header__mobile-menu--menu-icon"></i>
                            <a class="b" href="/WebPage/AboutUsPage/AboutUsPage.html">About us</a>
                            <a class="b" href="WebPage/Services/ServicePage.html">Services</a>
                            <a class="b" >Blogs</a>
                            <div class="menu__search-box">
                                <div class="menu__search-wrap">
                                    <input
                                        type="text"
                                        class="menu__search-input"
                                        placeholder="Search..."
                                    />
                                    <button class="menu__search-btn">
                                        <i class="fas fa-search menu__search-btn-icon"></i>
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