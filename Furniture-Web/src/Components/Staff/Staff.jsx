import React from "react";
import Sidebar from "./SideBar.jsx";
// import Manager from "./Manager.jsx";
// import MainContent from "./MainContent";
import { Routes, Route } from "react-router-dom";
import RequestList from "./RequestList.jsx";
// import Project from "./Project";
// import Quotation from "./Quotation";

function Staff() {
    return (
        <div className="flex">
            <Sidebar />
           <RequestList />
        </div>
    )
}

export default Staff