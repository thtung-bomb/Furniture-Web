import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AboutUsPage';
import './AboutUsPage.css';
import './AboutUsPage.js'
import bedroom from "../../../assets/image/bedroom.jpg";
import workroom from "../../../assets/image/workroom2.jpg";
import familyroom from "../../../assets/image/a3.jpg";
import diningroom from "../../../assets/image/a2.jpg";
import livingroom from "../../../assets/image/Slice 1 1 .png";
import restroom from "../../../assets/image/a6.jpg";

function DesignByUs() {

    // Slider settings

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };


    return (
        <div className="single-carousel" id="single-carousel">
            <Slider {...settings}>
                {/* Bed Room */}
                <div className="item">
                    <img className="body-pictures" src={bedroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng ngủ
                        </a>
                        <div className="description-details">
                            Không gian thư giản và nghỉ nơi sang trọng, đẳng cấp
                        </div>
                        <a href="/Details/BedroomDetails.html" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Bed Room */}

                {/* Rest Room */}
                <div className="item">
                    <img className="body-pictures" src={restroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng giải trí, thư giản
                        </a>
                        <div className="description-details">
                            Không gian thư giản giải trí sau những giờ làm việc
                        </div>
                        <a href="/Details/RestRoomDetails.html" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Rest Room */}

                {/* Living Room */}
                <div className="item">
                    <img className="body-pictures" src={livingroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng khách
                        </a>
                        <div className="description-details">
                            Không gian sang trọng, lịch sự đón những vị khách quý
                        </div>
                        <a href="/Details/LivingRoomDetails.html" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Living Room */}

                {/* Dining Room */}
                <div className="item">
                    <img className="body-pictures" src={diningroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng bếp
                        </a>
                        <div className="description-details">
                            Không gian ấm cúng nơi gia đình tụ họp thưởng thức những món ngon tuyệt vời
                        </div>
                        <a href="/Details/DiningRoomDetails.htm" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Dining Room */}

                {/* Family Room */}
                <div className="item">
                    <img className="body-pictures" src={familyroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng gia đình
                        </a>
                        <div className="description-details">
                            Nơi tụ họp của đại gia đình, gắn kết yêu thương
                        </div>
                        <a href="/Details/FamilyRoomDetails.html" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Family Room */}

                {/* Workroom */}
                <div className="item">
                    <img className="body-pictures" src={workroom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Phòng làm việc
                        </a>
                        <div className="description-details">
                            Không gian tập trung, tiện nghi mang đến môi trường làm việc hiệu quả
                        </div>
                        <a href="/Details/WorkRoomDetails.html" className="description-detail-more">Xem thêm</a>
                    </div>
                </div>
                {/* End Workroom */}
            </Slider>
        </div>
    )
}

export default DesignByUs