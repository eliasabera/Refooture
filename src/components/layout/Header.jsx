// layout/Header.jsx
import React, { useState } from "react";
import { useNavigation } from "../../contexts/NavigationContext";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Picture1.jpg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentSection, scrollToSection } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "insights", label: "Insights", path: "/insights" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== item.path) {
      // Force a hard navigation to ensure the page loads properly
      window.location.href = item.path;
    } else {
      // Scroll within current page
      scrollToSection(item.id);
    }
  };

  const isCurrentPage = (item) => {
    return location.pathname === item.path;
  };

  const isActiveSection = (item) => {
    return isCurrentPage(item) && currentSection === item.id;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-4 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-50 h-10 rounded-lg overflow-hidden">
              <img
                src={logo}
                alt="REFOOTURE Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  font-semibold transition-all duration-300 relative
                  ${
                    isCurrentPage(item)
                      ? "text-[#4379D0]"
                      : "text-[#000000] hover:text-[#4379D0]"
                  }
                `}
              >
                {item.label}
                {isActiveSection(item) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4379D0] transform translate-y-2"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#4379D0] hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl border border-[#000000] border-opacity-10">
            <nav className="flex flex-col space-y-2 p-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`
                    text-left px-4 py-3 rounded-lg font-semibold transition-all duration-200
                    ${
                      isCurrentPage(item)
                        ? "bg-[#4379D0] text-white"
                        : "text-[#000000] hover:bg-[#4379D0] hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
