import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './style.css'

const MovingImages = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "The Parents is open 24/7 for whenever you need to talk.",
      image: "/images/pexels-pavel-danilyuk-7055866.jpg",
      overlayPosition: "left",
    },
    {
      title: "Access free resources for parents.",
      image: "/images/pexels-pavel-danilyuk-7055881.jpg", 
      overlayPosition: "left",
    },
    {
      title: "We provide safe spaces for parents seeking support.",
      image: "/images/pexels-pavel-danilyuk-7055921.jpg", 
      overlayPosition: "left",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="carousel-wrapper">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="slide-image"
            />
            <div className="slide-overlay">
              <div className="slide-content">
                <h2 className="slide-title">{slide.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="nav-arrow left-arrow"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="nav-arrow right-arrow"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator ${currentSlide === index ? "active-indicator" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovingImages;
