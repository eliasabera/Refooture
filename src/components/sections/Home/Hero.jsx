// sections/Home/Hero.jsx
import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import AnimatedCounter from "../../ui/AnimatedCounter";
import { useAnimation } from "../../../contexts/AnimationContext";

import hero1 from "../../../assets/images/hero/hero1.jpg"
import hero2 from "../../../assets/images/hero/hero2.jpg"
import hero3 from "../../../assets/images/hero/1.jpg"
import hero4 from "../../../assets/images/hero/hero4.jpeg"


const Hero = () => {
  const { startAnimation, isAnimationCompleted } = useAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: hero2,
      alt: "Wanja Kerssa Landscape",
    },
    {
      image: hero1,
      alt: "Coffee Farm in Ethiopia",
    },
    {
      image: hero3,
      alt: "Local Community",
    },
    {
      image: hero4,
      alt: "Research and Innovation",
    },
  ];

  React.useEffect(() => {
    startAnimation("heroSection");
  }, [startAnimation]);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const stats = [
    { value: 97, label: "Agrarian Households", suffix: "%" },
    { value: 400, label: "Processing Stations" },
    { value: 245, label: "Publications" },
    { value: 8, label: "PhD Researchers" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white"
    >
      {/* Hero Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
          </div>
        ))}
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#4379D0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#4379D0] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Regenerating
            <span className="block text-white">Food Systems</span>
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 leading-relaxed">
            Transforming coffee waste into wealth through innovative, inclusive
            solutions in Ethiopia's Wanja Kerssa landscape
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="large"
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Our Work
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Involved
          </Button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={stat.value}
                  duration={2000}
                  delay={index * 300}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm md:text-base text-white opacity-90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
