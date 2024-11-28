import React, { useEffect, useState } from "react";
import "./ProductDetailPage.scss";
import Navbar from "../../Components/Layout/Header/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProductById } from "../../Redux/actions/product";
import RecommendationAndReviews from "./RecommendationAndReview";
import ReviewComponent from "./Review";

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedDesign, setSelectedDesign] = useState(0);
  const { product } = useSelector((state) => state.product)
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  console.log('id', id)
  useEffect(() => {
    dispatch(getOneProductById(id))
  }, [])

  console.log(product);
  // const product = {
  //   name: "Kiikii Osaka Japan Mens T-Shirt Limited Edition",
  //   price: 34.99,
  //   sizes: ["S", "M", "L", "XL", "XXL"],
  //   designs: [
  //     { id: 0, image: "/images/design1.jpg" },
  //     { id: 1, image: "/images/design2.jpg" },
  //   ],
  //   description: "High-quality cotton T-shirt with a sleek design inspired by Osaka, Japan.",
  // };

  return (
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
            <p className="product-price">${product?.inventory[0].price.toFixed(2)}</p>

            <div className="product-sizes">
              <p>AVAILABLE SIZES:</p>
              <div className="sizes">
                {["39", "40", "41", "42", "43"].map((size) => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? "active" : ""
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-designs">
              <p>AVAILABLE DESIGNS:</p>
              <div className="designs">
                {/* {product?.designs.map((design) => (
                <img
                  key={design?.id}
                  src={design?.image}
                  alt={`Design ${design?.id}`}
                  className={`design-image ${
                    selectedDesign === design.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedDesign(design?.id)}
                />
              ))} */}
              </div>
            </div>

            <button className="add-to-cart-button">Add To Shopping Bag</button>

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
      <RecommendationAndReviews/>
      <ReviewComponent/>
    </>
  );
};

export default ProductDetailPage;