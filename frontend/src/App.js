import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Home from "./Pages/Home.jsx";
import Store from "./Redux/store.js";
import Authentication from "./Pages/Authentication.jsx";
import { getAllProducts } from "./Redux/actions/product.js";
import Trendy from "./Components/Home/Trendy/Trendy.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { useSelector } from "react-redux";
import Cart from "./Pages/Cart.jsx";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage.jsx";


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
        <Route path="/shop" element={<Trendy />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />

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