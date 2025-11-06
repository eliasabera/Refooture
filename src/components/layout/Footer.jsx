// layout/Footer.jsx
import React from "react";
import jimma from "../../assets/images/logo/jimma1.png";
import wageningen from "../../assets/images/logo/im.png"
import logo from "../../assets/images/logo/Picture1.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const partnerLogos = [
    {
      name: "Wageningen University",
      logo: wageningen,
    },
    {
      name: "Jimma University",
      logo: jimma,
    }
  ];
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    { label: "Email", value: "info@refooture.org" },
    { label: "Phone", value: "+251 921 628 030" },
    {
      label: "Address",
      value: "Woreda 9, Bole Sub-city, Addis Ababa, Ethiopia",
    },
  ];

  return (
    <footer className="bg-[#000000] text-white">
      {/* Main Footer Content - Reduced padding and margins */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-32 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={logo}
                  alt="REFOOTURE Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-tight">
              Transforming food systems through regenerative agriculture and
              inclusive innovation in Ethiopia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#4379D0] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Contact</h3>
            <ul className="space-y-1">
              {contactInfo.map((info) => (
                <li
                  key={info.label}
                  className="text-gray-300 text-sm leading-tight"
                >
                  <strong className="text-white">{info.label}:</strong>{" "}
                  {info.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Partners</h3>
            <div className="space-y-2">
              {partnerLogos.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white rounded p-2 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="border-t border-gray-700 pt-2">
          <div className="flex items-center justify-center gap-3 overflow-x-auto">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="flex-shrink-0 bg-white bg-opacity-5 rounded px-3 py-1"
              >
                <span className="text-gray-300 text-sm">{partner.name}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Bottom Bar - Made more compact */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-1 md:space-y-0">
            <div className="text-gray-400 text-xs">
              © {currentYear} REFOOTURE Project. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#4379D0] transition-colors duration-200 text-xs"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#4379D0] transition-colors duration-200 text-xs"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
