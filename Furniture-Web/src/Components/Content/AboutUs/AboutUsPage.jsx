import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './AboutUsPage';
import './AboutUsPage.css';
// import './AboutUsPage.js'
import a1 from "../../../assets/image/a1.jpg";
import a2 from "../../../assets/image/a2.jpg";
import bedroom from "../../../assets/image/bedroom.jpg";
import workroom from "../../../assets/image/workroom2.jpg";
import familyroom from "../../../assets/image/a3.jpg";
import diningroom from "../../../assets/image/a2.jpg";
import livingroom from "../../../assets/image/Slice 1 1 .png";
import restroom from "../../../assets/image/a6.jpg";
import DesignByUs from './DesignByUs';
import StaffIntroduce from './StaffIntroduce';

function AboutUsPage() {
    return (
        // About Us Page
        <>
            <div className="main">
                <div className="grid">

                    <div className="fullscreen-background">
                        <img className="body-img" src={a1} alt="" />
                        <h1>WELCOME TO FURNITURE</h1>
                    </div>
                    <div className="grid__row">
                        <div className="about-title">
                            <h1>ABOUT - US</h1>
                        </div>
                        <div className="about-us">

                            <img className="about-us-img" src={a2} alt="" />
                            <div className="about-us-content">
                                <p>
                                    Here we are!
                                </p>
                                <p>
                                    where we explore and create beautiful and unique living spaces.
                                    At Furniture, we are committed to providing high-quality furniture products and the most attentive services to meet all customer needs.
                                    With a diverse collection of designs and styles, we hope to inspire you to create the perfect living and working spaces. Join Furniture on the journey to turn every idea into reality!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row-2">
                        {/* Carousel box*/}
                        <div className="body-carousel-box">
                            <div className="hero-carousel">
                                <div className="body-title">
                                    <h1>Work Spaces designed by Us</h1>
                                </div>
                                {/* Design By Us Page */}
                                <DesignByUs />
                                {/* End Design By Us Page */}
                            </div>
                        </div>
                        {/* End Carousel box */}
                    </div>

                    {/* Staff Introduction */}
                    <StaffIntroduce />
                    {/* End Staff Introduction */}
                    <div className="quote-form">
                        <div className="quote-content">
                            <h1>CONTACT FOR CONSULTATION</h1>
                            <p>

                                For detailed and accurate consultation on services at SLV Vietnam, please fill in the information in the form provided on the side.
                                Upon receiving your registration information, the support team at SLV Vietnam will contact you directly within 24 hours to provide assistance, consultation, and specific pricing.

                            </p>
                        </div>
                        <div className="form-regis">
                            <div className="input-group name">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="input-group email">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="input-group phone">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="workspace">Workspace:</label>
                                <select id="workspace" name="workspace" required>
                                    <option selected disabled>Select workspace</option>
                                    <option value="Living Room">Living Room</option>
                                    <option value="Bed Room">Bed Room</option>
                                    <option value="Dining Room">Dining Room</option>
                                    <option value="Rest Room">Rest Room</option>
                                    <option value="Family Room">Family Room</option>
                                    <option value="Work Room">Work Room</option>
                                </select>
                            </div>


                            <div className="input-group main-content">
                                <label htmlFor="main-content">Main Content</label>
                                <textarea id="main-content" name="main-content" placeholder="Enter your main content"></textarea>
                            </div>

                            <button className="regis-button">Register for Quote</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default AboutUsPage