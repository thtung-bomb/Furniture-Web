import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import HomepageContent from './Components/Content/Homepage/HomepageContent.jsx';
import AboutUsPage from './Components/Content/AboutUs/AboutUsPage.jsx';
import Blog from './Components/Content/Blog/Blog.jsx';
import LivingRoom from './Components/Content/Services/Livingroom/LivingRoom.jsx';
import Service from './Components/Content/Services/Service.jsx';
import Customer from './Components/Customer/Customer.jsx';
import ManagerHome from './Components/Manager/ManagerHome.jsx';
import Login from './Register/Login.jsx';
import MainContent from './Components/Customer/MainContent.jsx';
import Manager from './Components/Customer/Manager.jsx';
import Project from './Components/Customer/Project.jsx';
import RequestList from './Components/Staff/RequestList.jsx';
import RequestDetails from './Components/Staff/RequestDetails.jsx';
import ProposalList from './Components/Staff/ProposalList.jsx';
import NoPage from './Components/Staff/NoPage.jsx';
import Staff from './Components/Staff/Staff.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleLogout = (navigate) => {
    localStorage.removeItem('customer');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
  };

  const handleLogin = (user) => {
    localStorage.setItem('customer', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserName(user.full_name);
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} userName={userName} handleLogout={handleLogout} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<HomepageContent />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<Service />}>
          <Route path="livingroom" element={<LivingRoom />} />
        </Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/managerhome" element={<ManagerHome />} />
        <Route path="/customer" element={<Customer isLoggedIn={isLoggedIn} />}>
          <Route index element={<MainContent />} />
          <Route path="manager" element={<Manager />}>
            <Route path="project" element={<Project />} />
          </Route>
        </Route>
        <Route path="/staff/*" element={<Staff isLoggedIn={isLoggedIn} />}>
          <Route index element={<RequestList />} />
          
          
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
