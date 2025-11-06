// sections/Home/Ecosystem.jsx
import React from "react";
import { useNetworkAnimation } from "../../../hooks/useNetworkAnimation";
import Section from "../../ui/Section";
import Card from "../../ui/Card";

const Ecosystem = () => {
  const { containerRef, registerNode, registerLine, startAnimation } =
    useNetworkAnimation();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation("gentle");
    }, 1000);

    return () => clearTimeout(timer);
  }, [startAnimation]);

  const ecosystemNodes = [
    {
      id: "thinkers",
      label: "Thinkers",
      description: "Researchers & Academics",
      x: 25,
      y: 50,
    },
    {
      id: "enablers",
      label: "Enablers",
      description: "Policymakers & Funders",
      x: 50,
      y: 20,
    },
    {
      id: "doers",
      label: "Doers",
      description: "Farmers & Processors",
      x: 75,
      y: 50,
    },
    {
      id: "community",
      label: "Community",
      description: "Local Residents",
      x: 50,
      y: 80,
    },
  ];

  const connections = [
    { from: { x: 25, y: 50 }, to: { x: 50, y: 20 } },
    { from: { x: 50, y: 20 }, to: { x: 75, y: 50 } },
    { from: { x: 75, y: 50 }, to: { x: 50, y: 80 } },
    { from: { x: 50, y: 80 }, to: { x: 25, y: 50 } },
    { from: { x: 25, y: 50 }, to: { x: 75, y: 50 } },
    { from: { x: 50, y: 20 }, to: { x: 50, y: 80 } },
  ];

  const roles = [
    {
      type: "thinkers",
      title: "Thinkers",
      description:
        "Bring new ideas, knowledge, and research perspectives to drive innovation.",
      examples: [
        "University Researchers",
        "Scientific Advisors",
        "Technical Experts",
      ],
    },
    {
      type: "enablers",
      title: "Enablers",
      description:
        "Create conditions through policy, finance, and institutional support.",
      examples: [
        "Government Agencies",
        "Development Partners",
        "Funding Organizations",
      ],
    },
    {
      type: "doers",
      title: "Doers",
      description:
        "Implement and experiment on the ground, demonstrating what is possible.",
      examples: ["Coffee Processors", "Farmers", "Community Leaders"],
    },
  ];

  return (
    <Section id="ecosystem" backgroundColor="white" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Collaborative <span className="text-[#4379D0]">Ecosystem</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            Bringing together thinkers, enablers, and doers to co-create
            regenerative solutions
          </p>
        </div>

        {/* Interactive Network Visualization */}
        <div className="mb-16">
          <div
            ref={containerRef}
            className="relative w-full h-96 bg-white rounded-2xl border-2 border-[#000000] border-opacity-10"
          >
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((connection, index) => (
                <line
                  key={index}
                  ref={(el) => registerLine(el, index)}
                  x1={`${connection.from.x}%`}
                  y1={`${connection.from.y}%`}
                  x2={`${connection.to.x}%`}
                  y2={`${connection.to.y}%`}
                  stroke="#000000"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
              ))}
            </svg>

            {/* Nodes */}
            {ecosystemNodes.map((node, index) => (
              <div
                key={node.id}
                ref={(el) => registerNode(el, index)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer group"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <div className="bg-white border-2 border-[#4379D0] rounded-full w-20 h-20 flex flex-col items-center justify-center p-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                  <div className="text-lg font-bold text-[#4379D0]">
                    {node.label}
                  </div>
                </div>

                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#000000] text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {node.description}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#000000]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card
              key={role.type}
              variant="elevated"
              padding="medium"
              hover={true}
            >
              <h3 className="text-xl font-bold text-[#000000] mb-3">
                {role.title}
              </h3>
              <p className="text-[#000000] opacity-80 mb-4 leading-relaxed">
                {role.description}
              </p>
              <ul className="space-y-2">
                {role.examples.map((example, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[#000000] opacity-70"
                  >
                    <div className="w-2 h-2 bg-[#4379D0] rounded-full mr-3"></div>
                    {example}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#000000] opacity-80 mb-6">
            Join our collaborative platform and be part of the transformation
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#4379D0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
          >
            Join the Ecosystem
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Ecosystem;
