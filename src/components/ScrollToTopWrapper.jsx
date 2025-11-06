// components/ScrollToTopWrapper.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return children;
};

export default ScrollToTopWrapper;
