import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomepageContent from "./Components/Content/Homepage/HomepageContent.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AboutUsPage from "./Components/Content/AboutUs/AboutUsPage.jsx";
import DisplayData from "./DisplayData.jsx";
import Blog from "./Components/Content/Blog/Blog.jsx";
import LivingRoom from "./Components/Content/Services/Livingroom/LivingRoom.jsx";
import Service from "./Components/Content/Services/Service.jsx";

function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<HomepageContent />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services/livingroom" element={<LivingRoom />} />
        <Route path="/blog" element={<Blog />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App
