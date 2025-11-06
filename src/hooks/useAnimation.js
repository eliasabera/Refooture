// hooks/useAnimation.js
import { useEffect, useRef, useState, useCallback } from "react";

export const useAnimation = (config = {}) => {
  const {
    animationType = "fadeIn",
    duration = 1000,
    delay = 0,
    threshold = 0.1,
    triggerOnce = true,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  } = config;

  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const animationPresets = {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { opacity: 0, transform: "translateY(50px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    slideDown: {
      from: { opacity: 0, transform: "translateY(-50px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    slideLeft: {
      from: { opacity: 0, transform: "translateX(50px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    slideRight: {
      from: { opacity: 0, transform: "translateX(-50px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    scale: {
      from: { opacity: 0, transform: "scale(0.8)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    bounce: {
      from: { opacity: 0, transform: "scale(0.3)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
    flip: {
      from: { opacity: 0, transform: "rotateY(90deg)" },
      to: { opacity: 1, transform: "rotateY(0deg)" },
    },
  };

  const applyAnimation = useCallback(() => {
    const element = elementRef.current;
    if (!element || (triggerOnce && animationCompleted)) return;

    const preset = animationPresets[animationType] || animationPresets.fadeIn;

    // Reset to initial state
    Object.keys(preset.from).forEach((key) => {
      element.style[key] = preset.from[key];
    });

    element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

    // Force reflow
    element.offsetHeight;

    // Apply final state
    setTimeout(() => {
      Object.keys(preset.to).forEach((key) => {
        element.style[key] = preset.to[key];
      });

      setAnimationCompleted(true);
    }, 50);
  }, [
    animationType,
    duration,
    delay,
    easing,
    triggerOnce,
    animationCompleted,
    animationPresets,
  ]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            applyAnimation();

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce, applyAnimation]);

  const restartAnimation = useCallback(() => {
    setAnimationCompleted(false);
    setIsVisible(false);

    setTimeout(() => {
      const element = elementRef.current;
      if (element) {
        const preset =
          animationPresets[animationType] || animationPresets.fadeIn;
        Object.keys(preset.from).forEach((key) => {
          element.style[key] = preset.from[key];
        });
      }

      setTimeout(() => {
        setIsVisible(true);
        applyAnimation();
      }, 100);
    }, 50);
  }, [animationType, animationPresets, applyAnimation]);

  return {
    ref: elementRef,
    isVisible,
    animationCompleted,
    restartAnimation,
  };
};
