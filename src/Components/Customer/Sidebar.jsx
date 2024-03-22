import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

function Sidebar() {
    return (

        <nav className="main-menu mt-[6em]">
            <ul className='flex flex-col text-sm gap-5'>
                <li>
                    <Link to=''>
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">
                            Đơn báo giá
                        </span>
                    </Link>
                </li>
                <li className="has-subnav">
                    <Link href="#">
                        <i className="fa fa-globe fa-2x"></i>
                        <span className="nav-text">
                            Global Surveyors
                        </span>
                    </Link>

                </li>
            </ul>
        </nav>

    )
}

export default Sidebar