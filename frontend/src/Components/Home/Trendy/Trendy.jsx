import React, { useEffect, useState } from "react";
import "./Trendy.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const Trendy = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState({});

  // Fetch categories and products when component mounts
  useEffect(() => {
    fetchCategory();
    fetchProductsByTab(activeTab);
  }, [activeTab]);

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category/getall");
      setCategories(res.data.list || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProductsByTab = async (tab) => {
    const url =
      tab === "tab1"
        ? "http://localhost:4000/api/product/get"
        : `http://localhost:4000/api/product/category/get/${tab}`;

    try {
      const res = await axios.get(url, {
        headers: { "Cache-Control": "no-cache" },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleTabClick = (tab) => {
    if (tab !== activeTab) setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishList) => ({
      ...prevWishList,
      [productID]: !prevWishList[productID],
    }));
  };

 

  return (
    <>
    <div className="trendyProducts">
      <h2>
        Our Trendy <span>Products</span>
      </h2>
      <div className="trendyTabs">
        <div className="tabs">
          <p
            onClick={() => handleTabClick("tab1")}
            className={activeTab === "tab1" ? "active" : ""}
          >
            All
          </p>
          {categories.length > 0 ? (
            categories.map((category) => (
              <p
                key={category._id}
                onClick={() => handleTabClick(category._id)}
                className={activeTab === category._id ? "active" : ""}
              >
                {category.category_name}
              </p>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
        <div className="trendyTabContent">
          {products.length > 0 ? (
            <div className="trendyMainContainer">
              {products.slice(0, 8).map((product) => (
                <div className="trendyProductContainer" key={product._id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product?._id}`} onClick={scrollToTop}>
                      <img
                        src={product.main_image}
                        alt=""
                        className="trendyProduct_front"
                      />
                      <img
                        src={product.images[0]}
                        alt=""
                        className="trendyProduct_back"
                      />
                    </Link>
                    <h4 onClick=''>
                      Detail
                    </h4>
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    onClick=''
                  >
                    <FaCartPlus />
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">
                      <p>Dresses</p>
                     
                    </div>
                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.product_name}</h5>
                      </Link>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          <FaStar color="#FEC78A" size={10} />
                          <FaStar color="#FEC78A" size={10} />
                          <FaStar color="#FEC78A" size={10} />
                          <FaStar color="#FEC78A" size={10} />
                          <FaStar color="#FEC78A" size={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có sản phẩm nào trong danh mục này.</p>
          )}
        </div>
      </div>
      <div className="discoverMore">
        <Link to="/shop" onClick={scrollToTop}>
          <p>Discover More</p>
        </Link>
      </div>
    </div>
  
    </>
  );
};

export default Trendy;
