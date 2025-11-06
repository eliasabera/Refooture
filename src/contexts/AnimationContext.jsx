// contexts/AnimationContext.jsx
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

const AnimationContext = createContext();

const animationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANIMATION_STATE":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            ...state.animations[action.payload.name],
            ...action.payload.state,
          },
        },
      };

    case "SET_GLOBAL_ANIMATION_SETTINGS":
      return {
        ...state,
        globalSettings: {
          ...state.globalSettings,
          ...action.payload,
        },
      };

    case "REGISTER_ANIMATION":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            isActive: false,
            isCompleted: false,
            progress: 0,
            startTime: null,
            duration: action.payload.duration || 1000,
            ...action.payload.initialState,
          },
        },
      };

    case "START_ANIMATION":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            ...state.animations[action.payload.name],
            isActive: true,
            startTime: Date.now(),
            isCompleted: false,
          },
        },
      };

    case "COMPLETE_ANIMATION":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            ...state.animations[action.payload.name],
            isActive: false,
            isCompleted: true,
            progress: 100,
          },
        },
      };

    case "UPDATE_ANIMATION_PROGRESS":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            ...state.animations[action.payload.name],
            progress: action.payload.progress,
          },
        },
      };

    case "RESET_ANIMATION":
      return {
        ...state,
        animations: {
          ...state.animations,
          [action.payload.name]: {
            ...state.animations[action.payload.name],
            isActive: false,
            isCompleted: false,
            progress: 0,
            startTime: null,
          },
        },
      };

    case "RESET_ALL_ANIMATIONS":
      const resetAnimations = {};
      Object.keys(state.animations).forEach((key) => {
        resetAnimations[key] = {
          ...state.animations[key],
          isActive: false,
          isCompleted: false,
          progress: 0,
          startTime: null,
        };
      });
      return {
        ...state,
        animations: resetAnimations,
      };

    default:
      return state;
  }
};

const initialState = {
  globalSettings: {
    reduceMotion: false,
    prefersReducedMotion: false,
    animationEnabled: true,
    animationSpeed: 1.0,
    staggerDelay: 100,
    threshold: 0.1,
  },
  animations: {
    heroSection: {
      isActive: false,
      isCompleted: false,
      progress: 0,
      duration: 1500,
    },
    networkGraph: {
      isActive: false,
      isCompleted: false,
      progress: 0,
      duration: 2000,
    },
    scrollingNarrative: {
      isActive: false,
      isCompleted: false,
      progress: 0,
      duration: 2500,
    },
    parallaxBackground: {
      isActive: false,
      isCompleted: false,
      progress: 0,
      duration: 1000,
    },
  },
};

export const AnimationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e) => {
      dispatch({
        type: "SET_GLOBAL_ANIMATION_SETTINGS",
        payload: {
          prefersReducedMotion: e.matches,
          animationEnabled: !e.matches,
        },
      });
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const registerAnimation = useCallback(
    (name, duration = 1000, initialState = {}) => {
      dispatch({
        type: "REGISTER_ANIMATION",
        payload: { name, duration, initialState },
      });
    },
    []
  );

  const startAnimation = useCallback(
    (name) => {
      if (!state.globalSettings.animationEnabled) return;

      dispatch({
        type: "START_ANIMATION",
        payload: { name },
      });

      // Auto-complete after duration
      const animation = state.animations[name];
      if (animation) {
        setTimeout(() => {
          dispatch({
            type: "COMPLETE_ANIMATION",
            payload: { name },
          });
        }, animation.duration / state.globalSettings.animationSpeed);
      }
    },
    [
      state.globalSettings.animationEnabled,
      state.globalSettings.animationSpeed,
      state.animations,
    ]
  );

  const completeAnimation = useCallback((name) => {
    dispatch({
      type: "COMPLETE_ANIMATION",
      payload: { name },
    });
  }, []);

  const resetAnimation = useCallback((name) => {
    dispatch({
      type: "RESET_ANIMATION",
      payload: { name },
    });
  }, []);

  const resetAllAnimations = useCallback(() => {
    dispatch({ type: "RESET_ALL_ANIMATIONS" });
  }, []);

  const updateAnimationProgress = useCallback((name, progress) => {
    dispatch({
      type: "UPDATE_ANIMATION_PROGRESS",
      payload: { name, progress },
    });
  }, []);

  const setGlobalSettings = useCallback((settings) => {
    dispatch({
      type: "SET_GLOBAL_ANIMATION_SETTINGS",
      payload: settings,
    });
  }, []);

  const getAnimationState = useCallback(
    (name) => {
      return state.animations[name] || null;
    },
    [state.animations]
  );

  const isAnimationActive = useCallback(
    (name) => {
      return state.animations[name]?.isActive || false;
    },
    [state.animations]
  );

  const isAnimationCompleted = useCallback(
    (name) => {
      return state.animations[name]?.isCompleted || false;
    },
    [state.animations]
  );

  const getAnimationProgress = useCallback(
    (name) => {
      return state.animations[name]?.progress || 0;
    },
    [state.animations]
  );

  const value = {
    ...state,
    registerAnimation,
    startAnimation,
    completeAnimation,
    resetAnimation,
    resetAllAnimations,
    updateAnimationProgress,
    setGlobalSettings,
    getAnimationState,
    isAnimationActive,
    isAnimationCompleted,
    getAnimationProgress,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

export default AnimationContext;
