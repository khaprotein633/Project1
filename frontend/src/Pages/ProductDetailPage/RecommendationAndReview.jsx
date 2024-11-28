import React, { useState, useRef, useEffect } from "react";
import "./RecommendationAndReview.scss";

const ProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const [maxIndex, setMaxIndex] = useState(0);

    const products = [
        { id: 1, img: "shoe1.png", name: "Nike Zoom Freak", price: "$444.99" },
        { id: 2, img: "shoe2.png", name: "Nike Air Pegasus", price: "$178.99" },
        { id: 3, img: "shoe3.png", name: "Nike Air Jordans", price: "$154.99" },
        { id: 4, img: "shoe4.png", name: "Nike Air VaporMax", price: "$198.66" },
        { id: 5, img: "shoe5.png", name: "Nike React Infinity", price: "$299.99" },
        { id: 6, img: "shoe6.png", name: "Nike FlyEase", price: "$224.99" },
        { id: 7, img: "shoe7.png", name: "Nike Air Max", price: "$189.99" },
        { id: 8, img: "shoe8.png", name: "Nike Revolution", price: "$129.99" },
        { id: 9, img: "shoe9.png", name: "Nike Free RN", price: "$149.99" },
        { id: 10, img: "shoe10.png", name: "Nike ZoomX", price: "$199.99" },
    ];

    useEffect(() => {
        // Calculate the maximum scrollable index
        const sliderWidth = sliderRef.current.offsetWidth; // Width of the visible slider
        const productWidth = sliderRef.current.scrollWidth / products.length; // Width of a single product
        const visibleProducts = Math.floor(sliderWidth / productWidth); // Number of products visible at a time
        const calculatedMaxIndex = products.length - visibleProducts; // Total slides possible
        setMaxIndex(calculatedMaxIndex > 0 ? calculatedMaxIndex : 0);
    }, [products]);

    const slide = (direction) => {
        // Adjust index based on direction
        const newIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
        setCurrentIndex(newIndex);

        // Apply transform to move the slider
        const productWidth = sliderRef.current.scrollWidth / products.length; // Width of a single product
        sliderRef.current.style.transform = `translateX(-${newIndex * productWidth}px)`;
    };

    return (
        <>
            <div className="title">

            <h2>You May Also Like</h2>

            <div className="slider-container">

                <button
                    className={`arrow left ${currentIndex === 0 ? "disabled" : ""}`}
                    onClick={() => slide(-1)}
                    disabled={currentIndex === 0}
                >
                    &#8249;
                </button>
                <div className="slider-wrapper">
                    <div className="slider" ref={sliderRef}>
                        {products.map((product) => (
                            <div key={product.id} className="product">
                                <img src={product.img} alt={product.name} />
                                <div className="product-details">
                                    <p className="name">{product.name}</p>
                                    <p className="price">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className={`arrow right ${currentIndex === maxIndex ? "disabled" : ""}`}
                    onClick={() => slide(1)}
                    disabled={currentIndex === maxIndex}
                >
                    &#8250;
                </button>
            </div>
            </div>
        </>
    );
};

export default ProductSlider;
