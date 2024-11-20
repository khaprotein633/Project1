import React, { useEffect, useState } from "react";
import "./Navbar.css";

// import { useSelector } from "react-redux";

import logo from "../../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

// social Links imports Icons

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/actions/user";
import { getCartByUserId } from "../../../Redux/actions/cart";
import axios from "axios";
import { server } from "../../../Config/server";

const Navbar = () => {
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [loadedProductIds, setLoadedProductIds] = useState(new Set()); // Track loaded products
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const toggleCartPopup = () => {
    setCartPopupOpen(!cartPopupOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/loginSignUp");
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (user) {
      dispatch(getCartByUserId(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (cart && cart[0] && cart[0].items) {
        const items = cart[0].items.filter((item) => !loadedProductIds.has(item.productId));

        if (items.length === 0) return; // Skip if all products are already loaded

        try {
          const promises = items.map((item) =>
            axios.get(`${server}/product/get/${item.productId}`)
          );

          const responses = await Promise.all(promises);
          const products = responses.map((response) => response.data);

          setProductDetails(products);

        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [cart, loadedProductIds]);

  useEffect(() => {
    if (cart && cart[0] && cart[0].items && productDetails) {
      setTotal(cart[0]?.totalPrice);
    }else{
      setTotal(0);
    }

  }, [cart,productDetails]);
  console.log("cart",cart);


  return (
    productDetails &&<>

      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link to="/" onClick={scrollToTop}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={scrollToTop}>
                  SHOP
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={scrollToTop}>
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          <FiSearch size={22} onClick={scrollToTop} />
          {user ? (
            <>
              <Link to="/profile">
                <FaRegUser size={22} />
              </Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={scrollToTop}>
              <FaRegUser size={22} />
            </Link>
          )}

          <div onClick={toggleCartPopup} style={{ position: "relative", cursor: "pointer" }}>
            <Badge
              // badgeContent={cart.items?.length || 0}
              color="primary"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </div>
          <FiHeart size={22} onClick={scrollToTop} />
          {/* <RiMenu2Line size={22} /> */}
        </div>
      </nav>
      {/* Popup Cart */}
      {cartPopupOpen && (
        <div className="cartPopup">
          <h3>Your Cart</h3>
          {productDetails && productDetails?.length > 0 ? (
            <>
              <ul className="cartItemsList">
                {productDetails.map((item) => (
                  <li key={item.id} className="cartItem">
                    <div>
                      <strong>{item.product.product_name}</strong>
                      <p>{item.product.description}</p>
                    </div>
                    <span>{item.product.price}</span>
                  </li>
                ))}
              </ul>
              <div className="cartTotal">
                <p>Total: {total}</p>
              </div>
              <Link to="/checkout" onClick={toggleCartPopup} className="checkoutButton">
                Continue to Checkout
              </Link>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
          <button onClick={toggleCartPopup} className="closePopupButton">Close</button>
        </div>
      )}
      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div onClick={toggleCartPopup} style={{ position: "relative", cursor: "pointer" }}>
            <Badge
              // badgeContent={cart.items?.length || 0}
              color="primary"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <RiShoppingBagLine size={22} />
            </Badge>
          </div>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuTop">
            <div className="mobile-menuSearchBar">
              <div className="mobile-menuSearchBarContainer">
                <input type="text" placeholder="Search products" />
                <Link to="/shop">
                  <FiSearch size={22} onClick={toggleMobileMenu} />
                </Link>
              </div>
            </div>
            <div className="mobile-menuList">
              <ul>
                <li>
                  <Link to="/" onClick={toggleMobileMenu}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/shop" onClick={toggleMobileMenu}>
                    SHOP
                  </Link>
                </li>
                <li>
                  <Link to="/blog" onClick={toggleMobileMenu}>
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={toggleMobileMenu}>
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={toggleMobileMenu}>
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-menuFooter">
            <div className="mobile-menuFooterLogin">
              <Link to="/loginSignUp" onClick={toggleMobileMenu}>
                <FaRegUser />
                <p>My Account</p>
              </Link>
            </div>
            <div className="mobile-menuFooterLangCurrency">
              <div className="mobile-menuFooterLang">
                <p>Language</p>
                <select name="language" id="language">
                  <option value="english">United States | English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Germany">Germany</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="mobile-menuFooterCurrency">
                <p>Currency</p>
                <select name="currency" id="currency">
                  <option value="USD">$ USD</option>
                  <option value="INR">₹ INR</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                </select>
              </div>
            </div>
            <div className="mobile-menuSocial_links">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />
              <FaYoutube />
              <FaPinterest />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
