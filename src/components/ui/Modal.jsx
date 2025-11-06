// ui/Modal.jsx
import React, { useEffect, useRef } from "react";

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "medium",
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
  ...props
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000] bg-opacity-60"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`
          bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-auto
          transform transition-all duration-300 ease-out
          ${sizeClasses[size]}
          ${className}
        `
          .trim()
          .replace(/\s+/g, " ")}
        tabIndex={-1}
        {...props}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#4379D0] hover:text-white transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

const ModalHeader = ({ children, className = "" }) => (
  <div
    className={`p-6 border-b border-[#000000] border-opacity-10 ${className}`}
  >
    {children}
  </div>
);

const ModalBody = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const ModalFooter = ({ children, className = "" }) => (
  <div
    className={`p-6 border-t border-[#000000] border-opacity-10 ${className}`}
  >
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
