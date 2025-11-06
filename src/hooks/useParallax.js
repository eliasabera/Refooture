// hooks/useParallax.js
import { useEffect, useRef, useState, useCallback } from "react";

export const useParallax = (config = {}) => {
  const {
    speed = 0.5,
    direction = "vertical",
    reverse = false,
    enabled = true,
    smoothness = 10,
    breakpoints = {
      mobile: { speed: 0.3, enabled: true },
      tablet: { speed: 0.5, enabled: true },
      desktop: { speed: 0.7, enabled: true },
    },
  } = config;

  const elementRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("desktop");
  const rafId = useRef(null);

  const getCurrentBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }, []);

  const getBreakpointConfig = useCallback(() => {
    const bpConfig = breakpoints[currentBreakpoint] || {};
    return {
      speed: bpConfig.speed !== undefined ? bpConfig.speed : speed,
      enabled: bpConfig.enabled !== undefined ? bpConfig.enabled : enabled,
    };
  }, [currentBreakpoint, breakpoints, speed, enabled]);

  const calculateParallax = useCallback(() => {
    if (!enabled) return 0;

    const element = elementRef.current;
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.pageYOffset;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    const elementCenter = elementTop + elementHeight / 2;
    const windowCenter = window.pageYOffset + windowHeight / 2;

    const distanceFromCenter = elementCenter - windowCenter;
    const normalizedDistance = distanceFromCenter / windowHeight;

    const bpConfig = getBreakpointConfig();
    const effectiveSpeed = reverse ? -bpConfig.speed : bpConfig.speed;

    return normalizedDistance * effectiveSpeed * 100;
  }, [enabled, reverse, getBreakpointConfig]);

  const updateParallax = useCallback(() => {
    if (!isActive) return;

    const newScrollY = window.pageYOffset;
    setScrollY(newScrollY);

    const newParallaxValue = calculateParallax();

    setParallaxValue((prevValue) => {
      const diff = newParallaxValue - prevValue;
      return prevValue + diff / smoothness;
    });

    rafId.current = requestAnimationFrame(updateParallax);
  }, [isActive, calculateParallax, smoothness]);

  useEffect(() => {
    const bpConfig = getBreakpointConfig();
    setIsActive(bpConfig.enabled);
  }, [currentBreakpoint, getBreakpointConfig]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial breakpoint

    return () => window.removeEventListener("resize", handleResize);
  }, [getCurrentBreakpoint]);

  useEffect(() => {
    if (isActive) {
      rafId.current = requestAnimationFrame(updateParallax);
    } else {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      setParallaxValue(0);
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isActive, updateParallax]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isActive) return;

    const transformValue =
      direction === "vertical"
        ? `translateY(${parallaxValue}px)`
        : `translateX(${parallaxValue}px)`;

    element.style.transform = transformValue;
    element.style.willChange = "transform";
    element.style.transition = "transform 0.1s linear";
  }, [parallaxValue, direction, isActive]);

  const enableParallax = useCallback(() => {
    setIsActive(true);
  }, []);

  const disableParallax = useCallback(() => {
    setIsActive(false);
  }, []);

  const setSpeed = useCallback(
    (newSpeed) => {
      config.speed = newSpeed;
    },
    [config]
  );

  const toggleDirection = useCallback(() => {
    config.direction =
      config.direction === "vertical" ? "horizontal" : "vertical";
  }, [config]);

  return {
    ref: elementRef,
    parallaxValue,
    scrollY,
    isActive,
    currentBreakpoint,
    enableParallax,
    disableParallax,
    setSpeed,
    toggleDirection,
  };
};
