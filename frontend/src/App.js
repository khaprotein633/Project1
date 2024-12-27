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
import Shop from "./Components/Home/Trendy/Shop.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import { useSelector } from "react-redux";
import Cart from "./Pages/Cart.jsx";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage.jsx";
import PaymentPage from "./Pages/PaymentPage/PaymentPage.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./Config/server.js";
import OrderSuccessPage from "./Pages/OrderSuccess/OrderSuccessPage.jsx";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    console.log("data", data);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    // Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
    getStripeApikey();

  }, []);
  return (
    <BrowserRouter>
     {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                  <PaymentPage />
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />

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