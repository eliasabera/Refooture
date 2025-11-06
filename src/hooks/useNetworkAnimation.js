// hooks/useNetworkAnimation.js
import { useEffect, useRef, useState, useCallback } from "react";

export const useNetworkAnimation = (config = {}) => {
  const {
    nodes = [],
    connections = [],
    animationDuration = 1000,
    staggerDelay = 200,
    enableHoverEffects = true,
    enableClickEffects = true,
    particleEffects = true,
    glowEffects = true,
  } = config;

  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const particlesRef = useRef([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [animationPhase, setAnimationPhase] = useState("idle");
  const animationTimers = useRef([]);
  const lineRefs = useRef([]); // all lines
  const animationPresets = {
    gentle: {
      node: {
        enter: { scale: 0, opacity: 0, rotation: 180 },
        exit: { scale: 1, opacity: 1, rotation: 0 },
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      connection: {
        enter: { scaleX: 0, opacity: 0 },
        exit: { scaleX: 1, opacity: 0.6 },
        easing: "power2.out",
      },
    },
    energetic: {
      node: {
        enter: { scale: 0, opacity: 0, y: 100 },
        exit: { scale: 1, opacity: 1, y: 0 },
        easing: "back.out(1.7)",
      },
      connection: {
        enter: { scaleX: 0, opacity: 0 },
        exit: { scaleX: 1, opacity: 0.8 },
        easing: "elastic.out(1, 0.8)",
      },
    },
    fluid: {
      node: {
        enter: { scale: 0.5, opacity: 0, rotation: 90 },
        exit: { scale: 1, opacity: 1, rotation: 0 },
        easing: "smooth.out",
      },
      connection: {
        enter: { scaleX: 0, opacity: 0 },
        exit: { scaleX: 1, opacity: 0.7 },
        easing: "sine.out",
      },
    },
  };

  const applyNodeAnimation = useCallback(
    (nodeElement, index, preset = "gentle") => {
      if (!nodeElement) return;

      const animation =
        animationPresets[preset]?.node || animationPresets.gentle.node;

      // Set initial state
      Object.keys(animation.enter).forEach((prop) => {
        if (prop === "scale") {
          nodeElement.style.transform = `scale(${animation.enter.scale})`;
        } else if (prop === "rotation") {
          nodeElement.style.transform += ` rotate(${animation.enter.rotation}deg)`;
        } else if (prop === "y") {
          nodeElement.style.transform += ` translateY(${animation.enter.y}px)`;
        } else {
          nodeElement.style[prop] = animation.enter[prop];
        }
      });

      nodeElement.style.transition = `all ${animationDuration}ms ${
        animation.easing
      } ${index * staggerDelay}ms`;

      // Animate to final state
      setTimeout(() => {
        Object.keys(animation.exit).forEach((prop) => {
          if (prop === "scale") {
            nodeElement.style.transform = nodeElement.style.transform.replace(
              /scale\([^)]*\)/,
              `scale(${animation.exit.scale})`
            );
          } else if (prop === "rotation") {
            nodeElement.style.transform = nodeElement.style.transform.replace(
              /rotate\([^)]*\)/,
              `rotate(${animation.exit.rotation}deg)`
            );
          } else if (prop === "y") {
            nodeElement.style.transform = nodeElement.style.transform.replace(
              /translateY\([^)]*\)/,
              `translateY(${animation.exit.y}px)`
            );
          } else {
            nodeElement.style[prop] = animation.exit[prop];
          }
        });
      }, 50);
    },
    [animationDuration, staggerDelay, animationPresets]
  );

  const applyConnectionAnimation = useCallback(
    (connectionElement, index, preset = "gentle") => {
      if (!connectionElement) return;

      const animation =
        animationPresets[preset]?.connection ||
        animationPresets.gentle.connection;
      const delay = nodes.length * staggerDelay + index * staggerDelay;

      // Set initial state
      Object.keys(animation.enter).forEach((prop) => {
        connectionElement.style[prop] = animation.enter[prop];
      });

      connectionElement.style.transition = `all ${animationDuration}ms ${animation.easing} ${delay}ms`;

      // Animate to final state
      setTimeout(() => {
        Object.keys(animation.exit).forEach((prop) => {
          connectionElement.style[prop] = animation.exit[prop];
        });
      }, 50);
    },
    [animationDuration, staggerDelay, nodes.length, animationPresets]
  );

  const startAnimation = useCallback(
    (preset = "gentle") => {
      if (isAnimating) return;

      setIsAnimating(true);
      setAnimationPhase("nodes-entering");

      // Animate nodes
      nodesRef.current.forEach((nodeElement, index) => {
        const timer = setTimeout(() => {
          applyNodeAnimation(nodeElement, index, preset);
        }, index * staggerDelay);
        animationTimers.current.push(timer);
      });

      // Animate connections after nodes
      const connectionsDelay = nodes.length * staggerDelay;
      const connectionsTimer = setTimeout(() => {
        setAnimationPhase("connections-forming");

        connectionsRef.current.forEach((connectionElement, index) => {
          const timer = setTimeout(() => {
            applyConnectionAnimation(connectionElement, index, preset);
          }, index * staggerDelay);
          animationTimers.current.push(timer);
        });

        // Complete animation
        const completeTimer = setTimeout(() => {
          setAnimationPhase("complete");
          setIsAnimating(false);
        }, connectionsDelay + connections.length * staggerDelay + animationDuration);

        animationTimers.current.push(completeTimer);
      }, connectionsDelay);

      animationTimers.current.push(connectionsTimer);
    },
    [
      isAnimating,
      nodes.length,
      connections.length,
      staggerDelay,
      animationDuration,
      applyNodeAnimation,
      applyConnectionAnimation,
    ]
  );

  const resetAnimation = useCallback(() => {
    // Clear all timers
    animationTimers.current.forEach((timer) => clearTimeout(timer));
    animationTimers.current = [];

    // Reset all elements to initial state
    nodesRef.current.forEach((nodeElement) => {
      if (nodeElement) {
        nodeElement.style.transition = "none";
        nodeElement.style.opacity = "0";
        nodeElement.style.transform = "scale(0)";
      }
    });

    connectionsRef.current.forEach((connectionElement) => {
      if (connectionElement) {
        connectionElement.style.transition = "none";
        connectionElement.style.opacity = "0";
        connectionElement.style.transform = "scaleX(0)";
      }
    });

    setIsAnimating(false);
    setActiveNode(null);
    setAnimationPhase("idle");

    // Force reflow
    setTimeout(() => {
      nodesRef.current.forEach((nodeElement) => {
        if (nodeElement) {
          nodeElement.style.transition = "";
        }
      });
      connectionsRef.current.forEach((connectionElement) => {
        if (connectionElement) {
          connectionElement.style.transition = "";
        }
      });
    }, 50);
  }, []);

  const highlightNode = useCallback(
    (nodeIndex) => {
      if (!enableHoverEffects || !nodesRef.current[nodeIndex]) return;

      const nodeElement = nodesRef.current[nodeIndex];
      setActiveNode(nodeIndex);

      nodeElement.style.transform = "scale(1.2)";
      nodeElement.style.filter =
        "brightness(1.3) drop-shadow(0 0 20px rgba(67, 121, 208, 0.6))";
      nodeElement.style.zIndex = "10";
      nodeElement.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

      // Highlight connected connections
      connectionsRef.current.forEach((connection, index) => {
        if (connection && connections[index]) {
          const [source, target] = connections[index];
          if (source === nodeIndex || target === nodeIndex) {
            connection.style.stroke = "#4379D0";
            connection.style.strokeWidth = "3px";
            connection.style.opacity = "1";
            connection.style.filter =
              "drop-shadow(0 0 10px rgba(67, 121, 208, 0.4))";
          }
        }
      });
    },
    [enableHoverEffects, connections]
  );
  const registerLine = useCallback((el, index) => {
    if (el) lineRefs.current[index] = el;
  }, []);

  const resetNodeHighlight = useCallback(() => {
    if (activeNode === null) return;

    const nodeElement = nodesRef.current[activeNode];
    if (nodeElement) {
      nodeElement.style.transform = "scale(1)";
      nodeElement.style.filter =
        "brightness(1) drop-shadow(0 0 0px rgba(67, 121, 208, 0))";
      nodeElement.style.zIndex = "1";
    }

    // Reset connections
    connectionsRef.current.forEach((connection) => {
      if (connection) {
        connection.style.stroke = "";
        connection.style.strokeWidth = "";
        connection.style.opacity = "0.6";
        connection.style.filter = "";
      }
    });

    setActiveNode(null);
  }, [activeNode]);

  const registerNode = useCallback(
    (element, index) => {
      if (element) {
        nodesRef.current[index] = element;

        if (enableHoverEffects) {
          element.addEventListener("mouseenter", () => highlightNode(index));
          element.addEventListener("mouseleave", resetNodeHighlight);
        }

        if (enableClickEffects) {
          element.addEventListener("click", () => {
            // Handle node click
            console.log(`Node ${index} clicked`);
          });
        }
      }
    },
    [enableHoverEffects, enableClickEffects, highlightNode, resetNodeHighlight]
  );


  const registerConnection = useCallback((element, index) => {
    if (element) {
      connectionsRef.current[index] = element;
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup timers on unmount
      animationTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return {
    containerRef,
    registerNode,
    registerConnection,
    startAnimation,
    resetAnimation,
    highlightNode,
    resetNodeHighlight,
    isAnimating,
    animationPhase,
    activeNode,
    registerLine,
  };
};
