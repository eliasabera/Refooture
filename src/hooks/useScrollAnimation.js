// hooks/useScrollAnimation.js
import { useEffect, useRef, useState, useCallback } from "react";

export const useScrollAnimation = (config = {}) => {
  const {
    threshold = 0,
    direction = "vertical",
    sensitivity = 1,
    maxEffect = 100,
    enableParallax = true,
    enableScale = false,
    enableBlur = false,
  } = config;

  const elementRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [elementPosition, setElementPosition] = useState({ top: 0, height: 0 });

  const calculateProgress = useCallback(() => {
    const element = elementRef.current;
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top;
    const elementHeight = rect.height;

    const start = windowHeight * threshold;
    const end = -elementHeight;

    let progress = (start - elementTop) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    return progress;
  }, [threshold]);

  const applyScrollEffects = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const progress = calculateProgress();
    setScrollProgress(progress);

    const isVisible = progress > 0 && progress < 1;
    setIsInViewport(isVisible);

    if (!isVisible) return;

    const effectValue = (progress - 0.5) * 2 * maxEffect * sensitivity;
    const absEffectValue = Math.abs(effectValue);

    let transforms = [];
    let filters = [];

    if (enableParallax) {
      if (direction === "vertical") {
        transforms.push(`translateY(${effectValue}px)`);
      } else {
        transforms.push(`translateX(${effectValue}px)`);
      }
    }

    if (enableScale) {
      const scale = 1 - absEffectValue * 0.005;
      transforms.push(`scale(${Math.max(0.8, scale)})`);
    }

    if (enableBlur) {
      const blur = absEffectValue * 0.1;
      filters.push(`blur(${Math.min(5, blur)}px)`);
    }

    element.style.transform = transforms.join(" ");
    element.style.filter = filters.join(" ");
  }, [
    calculateProgress,
    direction,
    sensitivity,
    maxEffect,
    enableParallax,
    enableScale,
    enableBlur,
  ]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      setElementPosition({
        top: rect.top + window.pageYOffset,
        height: rect.height,
      });
    };

    updatePosition();

    const handleScroll = () => {
      applyScrollEffects();
    };

    const handleResize = () => {
      updatePosition();
      applyScrollEffects();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial apply
    applyScrollEffects();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [applyScrollEffects]);

  const registerElement = useCallback((element) => {
    elementRef.current = element;
  }, []);

  const scrollToElement = useCallback((behavior = "smooth") => {
    const element = elementRef.current;
    if (element) {
      element.scrollIntoView({ behavior, block: "center" });
    }
  }, []);

  const isElementInViewport = useCallback(() => {
    const element = elementRef.current;
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  return {
    ref: elementRef,
    scrollProgress,
    isInViewport,
    elementPosition,
    scrollToElement,
    isElementInViewport,
    registerElement,
  };
};
