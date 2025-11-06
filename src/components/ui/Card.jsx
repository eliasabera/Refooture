// ui/Card.jsx
import React from "react";

const Card = ({
  children,
  variant = "default",
  padding = "medium",
  hover = true,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-300 ease-out
    border border-[#000000] border-opacity-10
  `;

  const variantClasses = {
    default: "bg-white",
    elevated: "bg-white shadow-lg",
    outlined: "bg-transparent border-2 border-[#000000] border-opacity-20",
  };

  const paddingClasses = {
    none: "",
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  const hoverClass = hover
    ? "transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    : "";
  const clickClass = onClick ? "cursor-pointer" : "";

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hoverClass}
    ${clickClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardBody = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div
    className={`mt-4 pt-4 border-t border-[#000000] border-opacity-10 ${className}`}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
