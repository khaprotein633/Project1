import React, { useEffect, useState } from "react";
import "./ProductDetailPage.scss";
import Navbar from "../../Components/Layout/Header/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductById } from "../../Redux/actions/product";
import RecommendationAndReviews from "./RecommendationAndReview";
import ReviewComponent from "./Review";
import { AddCart } from "../../Redux/actions/cart";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [filteredInventory, setFilteredInventory] = useState();
  const {user} = useSelector((state)=>state.user)
  const {cart,success,error,isLoading} = useSelector((state)=>state.cart)

  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  useEffect(() => {
    dispatch(getOneProductById(id));
  }, [dispatch, id]);
  const [selectedDesign, setSelectedDesign] = useState("");
  useEffect(() => {
    if (product?.inventory) {
      const uniqueSizes = [...new Set(product.inventory.map(item => item.size))];
      setSizes(uniqueSizes);

      // Initialize with all inventory and colors when no size is selected
      setFilteredInventory(product.inventory);
      setColors([...new Set(product.inventory.map(item => item.color))]);
    }
  }, [product]);
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);

    // Filter inventory for the selected size
    const filtered = product.inventory.filter(item => item.size === size);
    setFilteredInventory(filtered);

    // Update available colors based on filtered inventory
    const uniqueColors = [...new Set(filtered.map(item => item.color))];
    setColors(uniqueColors);
    setSelectedColor(null); // Reset selected color when size changes
    // console.log('size',size);
    
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    // console.log('color',color);
    // Optionally, filter further based on color if required
    // Example: setFilteredInventory(filteredInventory.filter(item => item.color === color));
    filterInventory(selectedSize, color);

  };
  const filterInventory = (size, color) => {
    // If both size and color are selected, filter by both
    let filtered = product.inventory;
    if (size) {
      filtered = filtered.filter(item => item.size === size);
    }
    if (color) {
      filtered = filtered.filter(item => item.color === color);
    }
    console.log('filter',filtered[0])
    setFilteredInventory(filtered[0]);
  };
  const handleAddToCart = () =>{
    const cartItem = {
      userId: user._id,
      productId : product._id,
      quantity:1,
      inventoryId:filteredInventory._id,
    };
    if(!selectedColor ||  !selectedSize || !filteredInventory ){
      toast.error(`Please choose a product`);
      return;
    }
    try {
      dispatch(AddCart(cartItem))
      toast.success(`Add product ${product?.product_name} to cart successfully`)
    } catch (error) {
      toast.error(`Something went error!`)

    }

  }

  return (
    sizes &&
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-page__container">
          {/* Left Section */}
          <div className="product-page__image">
            <img

              src={product?.main_image}
              alt="Product Design"
            />
          </div>

          {/* Right Section */}
          <div className="product-page__details">
            <h1 className="product-name">{product?.product_name}</h1>
            <p className="product-price">
                {parseInt(product?.inventory[0]?.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </p>

            <div className="product-sizes">
              <p>AVAILABLE SIZES:</p>
              <div className="sizes">
                {sizes?.map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? "active" : ""
                      }`}
                    onClick={() => handleSizeClick(size)}                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-designs">
              <p>AVAILABLE DESIGNS:</p>
              <div className="designs">
                {colors?.map((color) => (
                  <button
                    key={color}
                    className={`designs-button ${selectedColor === color ? "active" : ""
                      }`}
                      onClick={() => handleColorClick(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-button">Add To Shopping Bag</button>

            <div className="product-icons">
              <div>
                <i className="fas fa-shipping-fast"></i>
                <p>Next-day Delivery</p>
              </div>
              <div>
                <i className="fas fa-lock"></i>
                <p>Secure Checkout</p>
              </div>
              <div>
                <i className="fas fa-undo"></i>
                <p>Free Returns</p>
              </div>
            </div>

            <div className="details-section">
              {/* Product Details */}
              <div className="details-item">
                <button
                  className="details-header"
                  onClick={() => toggleSection("productDetails")}
                >
                  <span>Product Details</span>
                  <i className={`icon ${activeSection === "productDetails" ? "rotate" : ""}`}>+</i>
                </button>
                <div
                  className={`details-content ${activeSection === "productDetails" ? "open" : ""
                    }`}
                >
                  <p>
                    A beautifully crafted product made with high-quality materials. Perfect for your needs.
                  </p>
                </div>
              </div>

              {/* Details & Care */}
              <div className="details-item">
                <button
                  className="details-header"
                  onClick={() => toggleSection("detailsCare")}
                >
                  <span>Details & Care</span>
                  <i className={`icon ${activeSection === "detailsCare" ? "rotate" : ""}`}>+</i>
                </button>
                <div
                  className={`details-content ${activeSection === "detailsCare" ? "open" : ""
                    }`}
                >
                  <p>Composition: 98% Cotton, 2% Elastane</p>
                  <p>Care: Professional dry clean only. Do not bleach. Do not iron.</p>
                </div>
              </div>

              {/* Delivery & Returns */}
              <div className="details-item">
                <button
                  className="details-header"
                  onClick={() => toggleSection("deliveryReturns")}
                >
                  <span>Delivery & Returns</span>
                  <i className={`icon ${activeSection === "deliveryReturns" ? "rotate" : ""}`}>+</i>
                </button>
                <div
                  className={`details-content ${activeSection === "deliveryReturns" ? "open" : ""
                    }`}
                >
                  <p>Next-day delivery available for selected locations. Free returns within 30 days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationAndReviews />
      <ReviewComponent />
    </>
  );
};

export default ProductDetailPage;