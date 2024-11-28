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
    // const fetchProductDetails = async () => {
    //   if (cart && cart[0] && cart[0].items) {
    //     const items = cart.items.filter((item) => !loadedProductIds.has(item.productId));

    //     if (items.length === 0) return; // Skip if all products are already loaded

    //     try {
    //       const promises = items.map((item) =>
    //         axios.get(`${server}/product/get/${item.productId}`)
    //       );

    //       const responses = await Promise.all(promises);
    //       const products = responses.map((response) => response.data);

    //       setProductDetails(products);

    //     } catch (error) {
    //       console.error("Error fetching product details:", error);
    //     }
    //   }
    // };

    // fetchProductDetails();
  }, [dispatch, user]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!cart?.items) return; // Nếu cart hoặc cart.items không tồn tại, thoát khỏi hàm

      const items = cart.items; // Lấy danh sách items từ giỏ hàng
      try {
        // Gọi API cho từng productId
        const promises = items.map((item) =>
          axios.get(`http://localhost:4000/api/product/get/${item.productId}`)
        );

        const responses = await Promise.all(promises);
        // console.log('all', responses);
        // Kết quả là một mảng chứa thông tin sản phẩm
        const products = responses.map((response) => response.data.product);

        // Cập nhật danh sách sản phẩm
        setProductDetails(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [cart, dispatch]);

  useEffect(() => {
    if (cart && cart.item && cart.items[0] && productDetails) {
      setTotal(cart[0]?.totalPrice);
    } else {
      setTotal(0);
    }

  }, [cart, productDetails]);

  return (
    productDetails && <>

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
          <div className="cart-header">
            <h2>Cart Summary ({productDetails.length} items)</h2>
            <button className="close-btn">&times;</button>
          </div>
          <div className="cart-items">
            {productDetails.map((item) => (
              <div className="cart-item" key={item?.id}>
                <img src={item?.main_image} alt={item?.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.product_name}</h3>
                  <p>
                    SIZE: {item?.size} / QTY: {item?.qty}
                  </p>
                </div>
                <div className="item-actions">
                  <span>${item?.price}</span>
                  <button className="remove-btn" >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="total">
              <h3>Grand Total</h3>
              <h3></h3>
            </div>
            <p className="sales-tax">sales tax</p>

            <button className="view-cart-btn">
              <Link to="/cart">
                View Cart
              </Link>
            </button>
            <button className="checkout-btn">Proceed To Checkout</button>
          </div>
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
