// layout/Navigation.jsx
import React from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const { currentSection, scrollProgress, scrollToSection, isNavigationReady } =
    useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  const sections = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "insights", label: "Insights", path: "/insights" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

const handleNavigation = (section) => {
  if (location.pathname !== section.path) {
    // Force page navigation
    navigate(section.path);
    // Ensure scroll position resets
    window.scrollTo(0, 0);
  } else {
    // Scroll within current page
    scrollToSection(section.id);
  }
};


  const isCurrentPage = (section) => {
    return location.pathname === section.path;
  };

  if (!isNavigationReady) {
    console.log("Navigation not ready");
    return null;
  }

  console.log(
    "Current location:",
    location.pathname,
    "Current section:",
    currentSection
  );

  return (
    <>
      {/* Progress Bar - Only show on home page where we have sections */}
      {location.pathname === "/" && (
        <div className="fixed top-0 left-0 w-full h-1 bg-[#000000] bg-opacity-10 z-50">
          <div
            className="h-full bg-[#4379D0] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}

      {/* Side Navigation for Desktop */}
      <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section)}
              className={`
                group flex items-center justify-center w-10 h-10 rounded-full 
                transition-all duration-300 transform hover:scale-110
                ${
                  isCurrentPage(section)
                    ? "bg-[#4379D0] text-white shadow-lg"
                    : "bg-white text-[#000000] shadow-md hover:bg-[#4379D0] hover:text-white"
                }
              `}
              title={section.label}
            >
              <span className="text-xs font-semibold">
                {section.label.charAt(0)}
              </span>

              {/* Tooltip */}
              <div className="absolute right-full mr-2 px-2 py-1 bg-[#000000] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {section.label}
                <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-1 h-1 bg-[#000000] rotate-45"></div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40 lg:hidden">
        <div className="flex items-center space-x-1 bg-white rounded-full shadow-lg border border-[#000000] border-opacity-10 px-3 py-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavigation(section)}
              className={`
                px-2 py-1 rounded-full transition-all duration-200 text-xs font-semibold
                ${
                  isCurrentPage(section)
                    ? "bg-[#4379D0] text-white"
                    : "text-[#000000] hover:bg-[#4379D0] hover:text-white"
                }
              `}
              title={section.label}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Scroll to Top Button - Only show on home page */}
      {location.pathname === "/" && scrollProgress > 10 && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-4 right-4 lg:right-16 z-40 w-8 h-8 bg-[#4379D0] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
          title="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Navigation;
