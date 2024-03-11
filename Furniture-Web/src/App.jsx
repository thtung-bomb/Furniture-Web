import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomepageContent from "./Components/Content/Homepage/HomepageContent.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AboutUsPage from "./Components/Content/AboutUs/AboutUsPage.jsx";
import Blog from "./Components/Content/Blog/Blog.jsx";
import LivingRoom from "./Components/Content/Services/Livingroom/LivingRoom.jsx";
import Service from "./Components/Content/Services/Service.jsx";
import Customer from "./Components/Customer/Customer.jsx";
import ManagerHome from "./Components/Manager/ManagerHome.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleLogout = (navigate) => {
    localStorage.removeItem('customer');
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('customer');
    setIsLoggedIn(false);
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
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="services" element={<Service />} />
        <Route path="services/livingroom" element={<LivingRoom />} />
        <Route path="blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/services" element={<Service />} />
        <Route path="/services/livingroom" element={<LivingRoom />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/tung" element={<Header />} />
        <Route path="/manager" element={<ManagerHome />} />

        <Route path="customer/*" element={<Customer isLoggedIn={isLoggedIn} />}>
          <Route path="" element={<MainContent />} />
          <Route path="manager/*" element={<Manager />}>
            <Route path="project" element={<Project />} />
          </Route>
        </Route>
        <Route path="staff/*" element={<Staff />}>
        </Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}
export default App
