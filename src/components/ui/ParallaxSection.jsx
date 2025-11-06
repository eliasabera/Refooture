// ui/ParallaxSection.jsx
import React, { useRef, useEffect, useState } from "react";

const ParallaxSection = ({
  children,
  speed = 0.5,
  className = "",
  ...props
}) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const element = ref.current;
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrolled = window.pageYOffset;
        const parallax = scrolled * speed;

        setOffset(parallax);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        style={{
          transform: `translateY(${offset}px)`,
        }}
        className="transition-transform duration-300 ease-out"
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
