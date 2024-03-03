import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import HomepageContent from "./Components/Content/Homepage/HomepageContent.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>

      <Header />

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<HomepageContent />} />

        </Routes>
      </BrowserRouter>

      <Footer />

    </>
  )
}

export default App
