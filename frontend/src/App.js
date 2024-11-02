import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Home from "./Pages/Home.jsx";
import { loadUser } from "./Redux/actions/user.js";
import Store from "./Redux/store.js";
import Authentication from "./Pages/Authentication.jsx";
import { getAllProducts } from "./Redux/actions/product.js";


function App() {

  useEffect(() => {
    // Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());

  }, []);
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />

      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;