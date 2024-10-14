
import './App.css';
import FE_layout from './views/FE_layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/Components/Header/Navbar";
import   Home from "../src/Pages/Home";
import Authentication from './Pages/Authentication';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/loginSignUp" element={<Authentication />} />

        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
