// sections/Projects/ProjectHotspots.jsx
import React, { useState } from "react";
import Section from "../../ui/Section";
import projectsData from "../../../assets/data/projects.json";

const ProjectHotspots = () => {
  const [activeHotspot, setActiveHotspot] = useState("coffee-plant");
  const { featured } = projectsData;

  const hotspots = [
    {
      id: "coffee-plant",
      title: "Coffee Processing Plant",
      description:
        "Primary source of coffee waste and pollution in the landscape",
      challenges: featured.challenges,
      x: 70,
      y: 40,
    },
    {
      id: "community",
      title: "Local Community",
      description:
        "Residents affected by coffee waste pollution and involved in solutions",
      challenges: [
        "Health risks from waste exposure",
        "Livelihood disruptions",
        "Limited access to clean water",
      ],
      x: 30,
      y: 60,
    },
    {
      id: "wetlands",
      title: "Natural Wetlands",
      description: "Ecosystems impacted by coffee processing effluents",
      challenges: ["Water pollution", "Biodiversity loss", "Soil degradation"],
      x: 60,
      y: 70,
    },
    {
      id: "research-station",
      title: "Research Station",
      description: "Center for developing and testing regenerative solutions",
      challenges: [
        "Technology adaptation",
        "Knowledge transfer",
        "Community engagement",
      ],
      x: 40,
      y: 30,
    },
  ];

  const solutions = [
    {
      title: "Improved Lagoons",
      description:
        "Constructing properly sized treatment lagoons to prevent overflow",
      impact: "Reduces water pollution by 80%",
      status: "Implemented",
    },
    {
      title: "Vetiver Grass",
      description: "Using vetiver grass for natural wastewater filtration",
      impact: "Improves water quality naturally",
      status: "Testing",
    },
    {
      title: "Modern Processing",
      description: "Introducing water-efficient coffee processing machines",
      impact: "Reduces water usage by 60%",
      status: "Planned",
    },
    {
      title: "Waste Valorization",
      description: "Transforming coffee waste into biogas and compost",
      impact: "Creates economic opportunities",
      status: "Pilot Phase",
    },
  ];

  const activeHotspotData = hotspots.find(
    (hotspot) => hotspot.id === activeHotspot
  );

  return (
    <Section backgroundColor="transparent" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
            Problem & Solution <span className="text-[#4379D0]">Hotspots</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            Identifying key challenges and implementing targeted solutions
            across the Wanja Kerssa landscape
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Interactive Diagram */}
          <div className="relative bg-white rounded-2xl border-2 border-[#000000] border-opacity-10 p-8">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#4379D0] rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#000000] rounded-full"></div>
              </div>

              {/* Hotspot Points */}
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    activeHotspot === hotspot.id
                      ? "scale-125 z-10"
                      : "scale-100 z-0 hover:scale-110"
                  }`}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                  }}
                >
                  <div
                    className={`
                    w-12 h-12 rounded-full border-4 bg-white shadow-lg flex items-center justify-center
                    ${
                      activeHotspot === hotspot.id
                        ? "border-[#4379D0] animate-pulse"
                        : "border-[#000000] border-opacity-30"
                    }
                  `}
                  >
                    <div
                      className={`
                      w-6 h-6 rounded-full
                      ${
                        activeHotspot === hotspot.id
                          ? "bg-[#4379D0]"
                          : "bg-[#000000] bg-opacity-30"
                      }
                    `}
                    ></div>
                  </div>

                  {/* Hotspot Label */}
                  <div
                    className={`
                    absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                    bg-[#000000] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap
                    transition-opacity duration-200
                    ${
                      activeHotspot === hotspot.id ? "opacity-100" : "opacity-0"
                    }
                  `}
                  >
                    {hotspot.title}
                  </div>
                </button>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <line
                  x1="30%"
                  y1="60%"
                  x2="40%"
                  y2="30%"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  strokeDasharray="4"
                />
                <line
                  x1="70%"
                  y1="40%"
                  x2="60%"
                  y2="70%"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  strokeDasharray="4"
                />
              </svg>
            </div>

            {/* Hotspot Navigation */}
            <div className="flex justify-center space-x-4 mt-6">
              {hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeHotspot === hotspot.id
                      ? "bg-[#4379D0] text-white"
                      : "bg-transparent text-[#000000] border border-[#000000] border-opacity-30 hover:bg-[#4379D0] hover:text-white"
                  }`}
                >
                  {hotspot.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Hotspot Details */}
          <div className="bg-white rounded-2xl border-2 border-[#000000] border-opacity-10 p-6">
            <h3 className="text-2xl font-bold text-[#000000] mb-2">
              {activeHotspotData?.title}
            </h3>
            <p className="text-[#000000] opacity-80 mb-6">
              {activeHotspotData?.description}
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-[#000000] mb-3">
                Key Challenges
              </h4>
              <ul className="space-y-2">
                {activeHotspotData?.challenges?.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start text-[#000000] opacity-80"
                  >
                    <div className="w-2 h-2 bg-[#4379D0] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#000000] mb-3">
                Proposed Solutions
              </h4>
              <div className="space-y-3">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#4379D0] bg-opacity-5 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-semibold text-[#000000]">
                        {solution.title}
                      </h5>
                      <span className="bg-[#4379D0] text-white px-2 py-1 rounded-full text-xs">
                        {solution.status}
                      </span>
                    </div>
                    <p className="text-[#000000] opacity-70 text-sm mb-2">
                      {solution.description}
                    </p>
                    <p className="text-[#4379D0] text-sm font-semibold">
                      Impact: {solution.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectHotspots;
