// ui/Section.jsx
import React from "react";

const Section = ({
  children,
  backgroundColor = "white",
  padding = "large",
  className = "",
  id,
  ...props
}) => {
  const backgroundClasses = {
    white: "bg-white",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    small: "py-8",
    medium: "py-12",
    large: "py-20",
    xlarge: "py-32",
  };

  const classes = `
    w-full
    ${backgroundClasses[backgroundColor]}
    ${paddingClasses[padding]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <section id={id} className={classes} {...props}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
};

export default Section;
