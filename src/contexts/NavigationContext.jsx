// contexts/NavigationContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

const NavigationContext = createContext();

const navigationReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_SECTION":
      return {
        ...state,
        currentSection: action.payload.section,
        previousSection: state.currentSection,
        sectionHistory: [...state.sectionHistory, action.payload.section].slice(
          -10
        ),
      };

    case "SET_ACTIVE_NAV_ITEM":
      return {
        ...state,
        activeNavItem: action.payload.item,
        navItemHistory: [...state.navItemHistory, action.payload.item].slice(
          -5
        ),
      };

    case "SET_SCROLL_DIRECTION":
      return {
        ...state,
        scrollDirection: action.payload.direction,
        lastScrollPosition: action.payload.scrollPosition,
      };

    case "SET_NAVIGATION_OPEN":
      return {
        ...state,
        isNavigationOpen: action.payload.isOpen,
      };

    case "SET_MOBILE_MENU_OPEN":
      return {
        ...state,
        isMobileMenuOpen: action.payload.isOpen,
      };

    case "SET_SCROLL_PROGRESS":
      return {
        ...state,
        scrollProgress: action.payload.progress,
        currentScrollY: action.payload.scrollY,
      };

    case "SET_SECTION_PROGRESS":
      return {
        ...state,
        sectionProgress: {
          ...state.sectionProgress,
          [action.payload.section]: action.payload.progress,
        },
      };

    case "SET_VIEWPORT_SIZE":
      return {
        ...state,
        viewport: {
          width: action.payload.width,
          height: action.payload.height,
          isMobile: action.payload.width < 768,
          isTablet: action.payload.width >= 768 && action.payload.width < 1024,
          isDesktop: action.payload.width >= 1024,
        },
      };

    case "ADD_SECTION_REF":
      return {
        ...state,
        sectionRefs: {
          ...state.sectionRefs,
          [action.payload.name]: action.payload.ref,
        },
      };

    case "SET_NAVIGATION_READY":
      return {
        ...state,
        isNavigationReady: action.payload.ready,
      };

    case "SET_SMOOTH_SCROLLING":
      return {
        ...state,
        smoothScrolling: action.payload.enabled,
      };

    case "SET_ACTIVE_MODAL":
      return {
        ...state,
        activeModal: action.payload.modal,
      };

    case "ADD_NAVIGATION_HISTORY":
      return {
        ...state,
        navigationHistory: [
          ...state.navigationHistory,
          action.payload.entry,
        ].slice(-50),
      };

    case "SET_NAVIGATION_ERROR":
      return {
        ...state,
        navigationError: action.payload.error,
      };

    case "CLEAR_NAVIGATION_ERROR":
      return {
        ...state,
        navigationError: null,
      };

    default:
      return state;
  }
};

const initialState = {
  currentSection: "home",
  previousSection: null,
  activeNavItem: "home",
  scrollDirection: "down",
  lastScrollPosition: 0,
  isNavigationOpen: true,
  isMobileMenuOpen: false,
  scrollProgress: 0,
  currentScrollY: 0,
  sectionProgress: {
    home: 0,
    about: 0,
    projects: 0,
    insights: 0,
    contact: 0,
  },
  viewport: {
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  },
  sectionRefs: {},
  sectionHistory: ["home"],
  navItemHistory: ["home"],
  isNavigationReady: false,
  smoothScrolling: true,
  activeModal: null,
  navigationHistory: [],
  navigationError: null,
};

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  // Viewport size tracking
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: "SET_VIEWPORT_SIZE",
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: window.innerWidth < 768,
          isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
          isDesktop: window.innerWidth >= 1024,
        },
      });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll tracking
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = (scrollY / scrollHeight) * 100;

          // Determine scroll direction
          const direction = scrollY > lastScrollY ? "down" : "up";

          dispatch({
            type: "SET_SCROLL_DIRECTION",
            payload: {
              direction,
              scrollPosition: scrollY,
            },
          });

          dispatch({
            type: "SET_SCROLL_PROGRESS",
            payload: {
              progress: Math.min(100, Math.max(0, progress)),
              scrollY,
            },
          });

          lastScrollY = scrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const setCurrentSection = useCallback((section) => {
    dispatch({
      type: "SET_CURRENT_SECTION",
      payload: { section },
    });

    // Add to navigation history
    dispatch({
      type: "ADD_NAVIGATION_HISTORY",
      payload: {
        entry: {
          section,
          timestamp: Date.now(),
          type: "section-change",
        },
      },
    });
  }, []);

  const setActiveNavItem = useCallback((item) => {
    dispatch({
      type: "SET_ACTIVE_NAV_ITEM",
      payload: { item },
    });
  }, []);

  const setNavigationOpen = useCallback((isOpen) => {
    dispatch({
      type: "SET_NAVIGATION_OPEN",
      payload: { isOpen },
    });
  }, []);

  const setMobileMenuOpen = useCallback((isOpen) => {
    dispatch({
      type: "SET_MOBILE_MENU_OPEN",
      payload: { isOpen },
    });
  }, []);

  const setSectionProgress = useCallback((section, progress) => {
    dispatch({
      type: "SET_SECTION_PROGRESS",
      payload: { section, progress },
    });
  }, []);

  const addSectionRef = useCallback((name, ref) => {
    dispatch({
      type: "ADD_SECTION_REF",
      payload: { name, ref },
    });
  }, []);

  const setNavigationReady = useCallback((ready) => {
    dispatch({
      type: "SET_NAVIGATION_READY",
      payload: { ready },
    });
  }, []);

  const setSmoothScrolling = useCallback((enabled) => {
    dispatch({
      type: "SET_SMOOTH_SCROLLING",
      payload: { enabled },
    });
  }, []);

  const setActiveModal = useCallback((modal) => {
    dispatch({
      type: "SET_ACTIVE_MODAL",
      payload: { modal },
    });
  }, []);

  const scrollToSection = useCallback(
    (sectionName, behavior = "smooth") => {
      try {
        const sectionRef = state.sectionRefs[sectionName];

        // Only scroll if the section exists on current page
        if (sectionRef && sectionRef.current) {
          sectionRef.current.scrollIntoView({
            behavior: state.smoothScrolling ? behavior : "auto",
            block: "start",
          });

          setCurrentSection(sectionName);
          setActiveNavItem(sectionName);

          dispatch({
            type: "ADD_NAVIGATION_HISTORY",
            payload: {
              entry: {
                section: sectionName,
                timestamp: Date.now(),
                type: "programmatic-scroll",
              },
            },
          });
        }
        // If section doesn't exist, just do nothing (it's probably on a different page)
      } catch (error) {
        // Silently fail - section doesn't exist on this page
      }
    },
    [
      state.sectionRefs,
      state.smoothScrolling,
      setCurrentSection,
      setActiveNavItem,
    ]
  );

  const getSectionRef = useCallback(
    (sectionName) => {
      return state.sectionRefs[sectionName];
    },
    [state.sectionRefs]
  );

  const getSectionProgress = useCallback(
    (sectionName) => {
      return state.sectionProgress[sectionName] || 0;
    },
    [state.sectionProgress]
  );

  const isSectionActive = useCallback(
    (sectionName) => {
      return state.currentSection === sectionName;
    },
    [state.currentSection]
  );

  const getNavigationHistory = useCallback(
    (limit = 10) => {
      return state.navigationHistory.slice(-limit);
    },
    [state.navigationHistory]
  );

  const clearNavigationError = useCallback(() => {
    dispatch({ type: "CLEAR_NAVIGATION_ERROR" });
  }, []);

  const value = {
    ...state,
    setCurrentSection,
    setActiveNavItem,
    setNavigationOpen,
    setMobileMenuOpen,
    setSectionProgress,
    addSectionRef,
    setNavigationReady,
    setSmoothScrolling,
    setActiveModal,
    scrollToSection,
    getSectionRef,
    getSectionProgress,
    isSectionActive,
    getNavigationHistory,
    clearNavigationError,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export default NavigationContext;
