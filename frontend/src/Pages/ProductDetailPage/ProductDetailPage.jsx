// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import "./ProductDetailPage.scss";
import Navbar from "../../Components/Layout/Header/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { getOneProductById } from "../../Redux/actions/product";
import RecommendationAndReviews from "./RecommendationAndReview";
import ReviewComponent from "./Review";
import { AddCart, getCartByUserId } from "../../Redux/actions/cart";
import { AddWishList, getWishListByUserId } from "../../Redux/actions/wishlist";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  // State declarations
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [filteredInventory, setFilteredInventory] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState(null);  // New state for price

  // Redux selectors
  const { user } = useSelector((state) => state.user);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Retrieve product ID from URL params
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.inventory) {
      const uniqueSizes = [...new Set(product.inventory.map((item) => item.size))];
      const uniqueColors = [...new Set(product.inventory.map((item) => item.color))];

      setSizes(uniqueSizes);
      setColors(uniqueColors);
      setFilteredInventory(product.inventory);
      setProductImage(product.main_image);
      setProductPrice(product.inventory[0].price)
    }
  }, [product]);

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);

    const filtered = product.inventory.filter((item) => item.size === size);
    setFilteredInventory(filtered);
    setColors([...new Set(filtered.map((item) => item.color))]);
    setSelectedColor(null);
    setProductImage(filtered.length > 0 ? filtered[0].image_url : product.main_image);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    filterInventory(selectedSize, color);
  };

  const filterInventory = (size, color) => {
    let filtered = product.inventory;

    if (size) filtered = filtered.filter((item) => item.size === size);
    if (color) filtered = filtered.filter((item) => item.color === color);

    setFilteredInventory(filtered[0]);
    setProductImage(filtered[0]?.image_url || product.main_image);
    setProductPrice(filtered[0]?.price || product?.inventory[0]?.price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !filteredInventory) {
      toast.error("Please choose a product");
      return;
    }

    const cartItem = {
      userId: user._id,
      productId: product._id,
      quantity: 1,
      inventoryId: filteredInventory?._id,
    };

    try {


      dispatch(AddCart(cartItem)).then(() => {
        dispatch(getCartByUserId(user._id));
      })

      toast.success(`Added product ${product?.product_name} to cart successfully`);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleAddToWishlist = () => {
    if (!selectedSize || !selectedColor || !filteredInventory) {
      toast.error("Please choose a product");
      return;
    }

    const wishlistItem = {
      userId: user._id,
      productId: product._id,
      quantity: 1,
      inventoryId: filteredInventory?._id,
    };

    try {
      

      dispatch(AddWishList(wishlistItem)).then(() => {
        dispatch(getWishListByUserId(user._id));
      })
      toast.success(`Added product ${product?.product_name} to Wishlist successfully`);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-page__container">
          {/* Left Section */}
          <div className="product-page__image">
            <img src={productImage} alt="Product Design" />
          </div>

          {/* Right Section */}
          <div className="product-page__details">
            <h1 className="product-name">{product?.product_name}</h1>
            <p className="product-price">
              {parseInt(productPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>

            {/* Sizes */}
            <div className="product-sizes">
              <p>AVAILABLE SIZES:</p>
              <div className="sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? "active" : ""}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="product-designs">
              <p>AVAILABLE DESIGNS:</p>
              <div className="designs">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`designs-button ${selectedColor === color ? "active" : ""}`}
                    onClick={() => handleColorClick(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-actions">
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add To Shopping Bag
              </button>
              <button
                onClick={handleAddToWishlist}
                className="add-to-wishlist-button"
              >
                <FiHeart style={{ marginRight: "5px", color: "red" }} />
                Add to Wishlist
              </button>
            </div>

            {/* Icons Section */}
            <div className="product-icons">
              {[
                { icon: "fas fa-shipping-fast", text: "Next-day Delivery" },
                { icon: "fas fa-lock", text: "Secure Checkout" },
                { icon: "fas fa-undo", text: "Free Returns" },
              ].map(({ icon, text }, idx) => (
                <div key={idx}>
                  <i className={icon}></i>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <div className="details-section">
              {[
                { section: "productDetails", title: "Product Details", content: product?.description },
                { section: "detailsCare", title: "Details & Care", content: product?.detail },
                { section: "deliveryReturns", title: "Delivery & Returns", content: "Next-day delivery available for selected locations. Free returns within 30 days." },
              ].map(({ section, title, content }) => (
                <div key={section} className="details-item">
                  <button
                    className="details-header"
                    onClick={() => toggleSection(section)}
                  >
                    <span>{title}</span>
                    <i className={`icon ${activeSection === section ? "rotate" : ""}`}>+</i>
                  </button>
                  <div className={`details-content ${activeSection === section ? "open" : ""}`}>
                    <p>{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ReviewComponent userId={user._id} productId={product?._id} />
    </>
  );
};

export default ProductDetailPage;
