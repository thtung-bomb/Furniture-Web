import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomepageContent from "./Components/Content/Homepage/HomepageContent.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AboutUsPage from "./Components/Content/AboutUs/AboutUsPage.jsx";
import Blog from "./Components/Content/Blog/Blog.jsx";
import LivingRoom from "./Components/Content/Services/Livingroom/LivingRoom.jsx";
import Service from "./Components/Content/Services/Service.jsx";
import Customer from "./Components/Customer/Customer.jsx";
import Manager from "./Components/Customer/Manager.jsx";
import MainContent from "./Components/Customer/MainContent.jsx";
import Project from "./Components/Customer/Project.jsx";
import Quotation from "./Components/Customer/Quotation.jsx";
import History from "./Components/Customer/History.jsx";

import Staff from "./Components/Staff/Staff.jsx";

function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<HomepageContent />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="services" element={<Service />} />
        <Route path="services/livingroom" element={<LivingRoom />} />
        <Route path="blog" element={<Blog />} />

        <Route path="customer/*" element={<Customer />}>
          <Route path="" element={<MainContent />} />
          <Route path="manager/*" element={<Manager />}>
            <Route path="project" element={<Project />} />
          </Route>
        </Route>
        <Route path="staff/*" element={<Staff />}>
          {/* <Route path="" element={<MainContent />} />
          <Route path="manager/*" element={<Manager />}>
            <Route path="project" element={<Project />} />
          </Route> */}
        </Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}
export default App
