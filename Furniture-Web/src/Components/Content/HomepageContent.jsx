import React from 'react'
import "./homePage.js";
import "./HomepageContent.css"

function HomepageContent() {
    return (
        <div className="main">
            <div className="grid">
                <div className="row-auto">
                    <div className="overlay" id="overlay"></div>
                    <div className="hero-carousel">
                        <div className="single-carousel" id="single-carousel">
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/main_home.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/a1.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/a2.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/a3.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/a4.jpg" alt="" />
                            </div>
                            <div className="item">
                                <img className="body-picture" src="../../../src/assets/image/a5.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomepageContent