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
import { getCartByUserId, updateCartItem } from "../../../Redux/actions/cart";
import axios from "axios";
import { server } from "../../../Config/server";
import { formatCurrency } from "../../../utils/formatCurrency";
import { toast } from "react-toastify";
import { getWishListByUserId, updateWishListItem } from "../../../Redux/actions/wishlist";

const Navbar = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [wishListPopupOpen, setWishListPopupOpen] = useState(false);
  const [productDetailsForWishlist, setProductDetailsForWishlist] = useState([]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const toggleCartPopup = () => {
    setCartPopupOpen(!cartPopupOpen);
  };

  const toggleWishlistPopup = () => {
    setWishListPopupOpen(!wishListPopupOpen);
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
  const { allProducts } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishlist);

  const [totalPrice, setTotalPrice] = useState();
  const navigate = useNavigate()

  // Update cartList state only when cart is loaded and available
  const [cartList, setCartList] = useState(cart || []);
  const [wishlistItemList, setWishlistItemList] = useState(wishList || []);

  const handleCheckout = () => {
    navigate("/checkout")
  }
  useEffect(() => {
    if (user) {
      // Fetch cart data if user is logged in
      dispatch(getCartByUserId(user._id));
      dispatch(getWishListByUserId(user._id));

    }
  }, [user, dispatch]); // Only run when user changes or is authenticated
  const updateQuantity = (inventoryId, action) => {

    const newQuantity = action === 'increase' ? 1 : -1;
    const userId = user?._id;
    console.log(userId);
    const data = {
      userId,
      quantity: newQuantity
    }
    dispatch(updateCartItem(inventoryId, data)).then(() => {
      dispatch(getCartByUserId(user._id));
      toast.success("Cart Item Added Successfully");

    })

  };

  const updateQuantityForWishList = (inventoryId, action) => {

    const newQuantity = action === 'increase' ? 1 : -1;
    const userId = user?._id;
    console.log(userId);
    const data = {
      userId,
      quantity: newQuantity
    }
    dispatch(updateWishListItem(inventoryId, data)).then(() => {
      dispatch(getWishListByUserId(user._id));
      toast.success("Wishlist Item Added Successfully");

    })

  };

  // DELETE cart item function
  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(`${server}/cart/delete/${id}`, {
        data: { userId: user._id } // Send userId in the request body
      });

      if (response.status === 200) {
        // Successfully deleted, update the cart
        toast.success("Cart Item deleted Successfully");

        dispatch(getCartByUserId(user._id));

      } else {
        console.error("Error deleting cart item:", response.data.message);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
      // Handle error
    }
  };

  // DELETE cart item function
  const deleteWishlistItem = async (id) => {
    try {
      const response = await axios.delete(`${server}/wishlist/delete/${id}`, {
        data: { userId: user._id } // Send userId in the request body
      });

      if (response.status === 200) {
        // Successfully deleted, update the cart
        toast.success("wishlist Item deleted Successfully");

        dispatch(getCartByUserId(user._id));

      } else {
        console.error("Error deleting wishlist item:", response.data.message);
        // Handle error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      // Handle error
    }
  };

  useEffect(() => {
    // Only update cartList when cart data is available
    if (cart?.items) {
      setCartList(cart);
    }
    if (wishList?.items) {
      setWishlistItemList(wishList);
    }
  }, [cart,wishList]); // Run only when cart is updated
  console.log('wishList',wishList)
  console.log('cartList',cartList)

  useEffect(() => {
    if (cartList?.items && allProducts?.length > 0) {
      const cartProducts = cartList.items.map((cartItem) => {
        const product = allProducts.find((p) => p._id === cartItem.productId);
        const inventory = product.inventory.find((i) => i._id === cartItem.inventoryId);

        return {
          _id: cartItem._id,
          inventoryId: inventory._id,
          size: inventory.size,
          color: inventory.color,
          price: inventory.price,
          quantity: cartItem.quantity,
          category_id: product.category_id,
          product_name: product.product_name,
          brand_id: product.brand_id,
          description: product.description,
          detail: product.detail,
          main_image: product.main_image,
          images: product.images,
          hide: product.hide,
          date_added: product.date_added,
          date_updated: product.date_updated,
        };
      });
      setProductDetails(cartProducts);
      const totalPrice = productDetails.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0)
      setTotalPrice(totalPrice);
    }
    if (wishlistItemList?.items && allProducts?.length > 0) {
      const wishlistProducts = wishlistItemList.items.map((wishlistItem) => {
        const product = allProducts.find((p) => p._id === wishlistItem.productId);
        const inventory = product.inventory.find((i) => i._id === wishlistItem.inventoryId);

        return {
          _id: wishlistItem._id,
          inventoryId: inventory._id,
          size: inventory.size,
          color: inventory.color,
          price: inventory.price,
          quantity: wishlistItem.quantity,
          category_id: product.category_id,
          product_name: product.product_name,
          brand_id: product.brand_id,
          description: product.description,
          detail: product.detail,
          main_image: product.main_image,
          images: product.images,
          hide: product.hide,
          date_added: product.date_added,
          date_updated: product.date_updated,
        };
      });
      setProductDetailsForWishlist(wishlistProducts);
     
    }
  }, [cartList, allProducts,wishlistItemList]); // Only run when cartList or allProducts change

  // Loading state if cart or product details are missing
  console.log('product', productDetailsForWishlist)
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

          <div onClick={toggleWishlistPopup} style={{ position: "relative", cursor: "pointer" }}>
            <Badge
              // badgeContent={cart.items?.length || 0}
              color="primary"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <FiHeart size={22} />
            </Badge>
          </div>
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
                  <div className="cart-popup">
                    <span>{formatCurrency(item?.price)}</span>
                    <div className="actions">
                      <button onClick={() => updateQuantity(item._id, 'decrease')}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 'increase')}>+</button>
                    </div>

                  </div>
                  <div className="remove-btn" onClick={() => deleteCartItem(item._id)}> {/* Call deleteCartItem */}
                    ×
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="total">
              <h3>Grand Total</h3>
              <h3>{formatCurrency(totalPrice)}</h3>
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

      {wishListPopupOpen && (
        <div className="cartPopup">
          <div className="cart-header">
            <h2>Wishlist ({productDetailsForWishlist.length} items)</h2>
            <button className="close-btn">&times;</button>
          </div>
          <div className="cart-items">
            {productDetailsForWishlist.map((item) => (
              <div className="cart-item" key={item?.id}>
                <img src={item?.main_image} alt={item?.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.product_name}</h3>
                  <p>
                    SIZE: {item?.size} / QTY: {item?.qty}
                  </p>
                </div>
                <div className="item-actions">
                  <div className="cart-popup">
                    <div className="actions">
                      <button onClick={() => updateQuantityForWishList(item._id, 'decrease')}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantityForWishList(item._id, 'increase')}>+</button>
                    </div>

                  </div>
                  <div className="remove-btn" onClick={() => deleteWishlistItem(item._id)}> {/* Call deleteCartItem */}
                    ×
                  </div>
                </div>
              </div>
            ))}
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
