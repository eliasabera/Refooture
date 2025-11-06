// ui/InteractiveNetwork.jsx
import React, { useRef, useEffect, useState } from "react";

const InteractiveNetwork = ({
  nodes = [],
  connections = [],
  onNodeClick,
  className = "",
  ...props
}) => {
  const containerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node, index) => {
    setSelectedNode(selectedNode === index ? null : index);
    if (onNodeClick) {
      onNodeClick(node, index);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-96 ${className}`}
      {...props}
    >
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, index) => (
          <line
            key={index}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="#000000"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => (
        <div
          key={index}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer
            ${selectedNode === index ? "scale-125" : "scale-100"}
            ${selectedNode === index ? "bg-[#4379D0]" : "bg-white"}
            ${selectedNode === index ? "text-white" : "text-[#000000]"}
            border-2 border-[#4379D0] rounded-full shadow-lg hover:shadow-xl
          `}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size || "60px",
            height: node.size || "60px",
          }}
          onClick={() => handleNodeClick(node, index)}
        >
          <div className="flex items-center justify-center w-full h-full p-2">
            {node.icon || node.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractiveNetwork;
