import React, { useRef } from 'react';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import bedRoom from '../../../assets/image/bedroom.jpg';
import a6 from '../../../assets/image/a6.jpg';
import slice from '../../../assets/image/Slice 1 1 .png';
import a2 from '../../../assets/image/a2.jpg';
import a3 from '../../../assets/image/a3.jpg';
import workRoom from '../../../assets/image/workroom2.jpg';

const screenWidth = window.innerWidth;

function BlogCarousel() {
    const elementRef = useRef();

    const sliderRight = () => {
        elementRef.current.scrollLeft += screenWidth - 110;
    }

    const sliderLeft = () => {
        elementRef.current.scrollLeft -= screenWidth - 110;
    }

    return (
        <div className='relative'>
            <HiChevronLeft className='ntt-arrow z-10' onClick={sliderLeft} />
            <HiChevronRight className='ntt-arrow right-0 z-10' onClick={sliderRight} />
            <div ref={elementRef} className="single-carousel flex overflow-x-scroll h-[250px] w-full scroll-bar-none">
                <div className="item">
                    <img className="body-pictures" src={bedRoom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Bedroom
                        </a>
                        <div className="description-details">
                            Rest, Sleep, Relaxation, Comfort, Serenity, Privacy.
                        </div>
                        <a href="/Details/BedroomDetails.html" className="description-detail-more">See more</a>
                    </div>
                </div>
                <div className="item">
                    <img className="body-pictures" src={a6} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Rest Room
                        </a>
                        <div className="description-details">
                            Refresh, Revitalize, Tranquility, Renewal, Privacy, Cleanliness.
                        </div>
                        <a href="/Details/RestRoomDetails.html" className="description-detail-more">See more</a>
                    </div>
                </div>
                <div className="item">
                    <img className="body-pictures" src={slice} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Living Room
                        </a>
                        <div className="description-details">
                            Gather, Socialize, Entertainment, Comfort, Conversation, Relaxation.
                        </div>
                        <a href="/Details/LivingRoomDetails.html" className="description-detail-more">See more</a>
                    </div>
                </div>
                <div className="item">
                    <img className="body-pictures" src={a2} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Dining Room
                        </a>
                        <div className="description-details">
                            Share, Meals, Family, Gatherings, Comfort, Hospitality.
                        </div>
                        <a href="/Details/DiningRoomDetails.htm" className="description-detail-more">See more</a>
                    </div>
                </div>
                <div className="item">
                    <img className="body-pictures" src={a3} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Family Room
                        </a>
                        <div className="description-details">
                            Bonding, Cozy, Informal, Relaxation, Entertainment, Comfort.
                        </div>
                        <a href="/Details/FamilyRoomDetails.html" className="description-detail-more">See more</a>
                    </div>
                </div>
                <div className="item">
                    <img className="body-pictures" src={workRoom} alt="" />
                    <div className="description">
                        <a href="#" className="description-title">
                            Work Room
                        </a>
                        <div className="description-details">
                            Productivity, Focus, Creativity, Efficiency, Organization, Comfort.
                        </div>
                        <a href="/Details/WorkRoomDetails.html" className="description-detail-more">See more</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCarousel;
