import React, { useState, useEffect } from "react";
import "./HeroSection.scss";
import banner1 from '../../../Assets/images/banners/banner-1.jpg'
import banner2 from '../../../Assets/images/banners/banner-2.jpg'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "JUST DO IT",
      subtitle: "NIKE SS21",
      buttonText: "Shop Latest Nike",
      image: banner1
    },
    {
      title: "EVERYTHING YOU NEED",
      subtitle: "SUMMER ESSENTIALS",
      buttonText: "Shop New Arrivals",
      image: banner2
    },
  ];


  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // 5 seconds for the hero section
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image}) ` }}
          >
            <div className="slide-content">
              <p>{slide.title}</p>
              <h1>{slide.subtitle}</h1>
              <button>{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Brands Section */}

    </div>
  );
};

export default HeroSection;
