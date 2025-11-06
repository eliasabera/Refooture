// sections/About/HumanNetwork.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNetworkAnimation } from "../../../hooks/useNetworkAnimation";
import Section from "../../ui/Section";
import Card from "../../ui/Card";
import Modal from "../../ui/Modal";
import gezahegn from "../../../assets/images/team/gezahegn.png";
import marta from "../../../assets/images/team/marta-hailemariam.png";
import tewodros from "../../../assets/images/team/tewodros-tefera.png";
import tilaye from "../../../assets/images/team/tilaye-teklewold.png";
const HumanNetwork = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filter, setFilter] = useState("all");
  const { containerRef, registerNode, registerLine, startAnimation } =
    useNetworkAnimation();

  const teamData = {
    leadership: [
      {
        id: 1,
        name: "Dr. Tewodros Tefera",
        role: "Project Manager & Co-Strategic Lead",
        expertise: [
          "Agricultural Economics",
          "Project Management",
          "Value Chain Development",
        ],
        publications: 50,
        image: tewodros,
        x: 50,
        y: 20,
      },
      {
        id: 2,
        name: "Prof. Dr. Gezahegn Berecha Yadessa",
        role: "Senior Technical Advisor for Regenerative Agriculture",
        expertise: ["Coffee Research", "Agroecology", "Project Coordination"],
        publications: 100,
        image: gezahegn,
        x: 25,
        y: 40,
      },
    ],
    advisors: [
      {
        id: 3,
        name: "Prof. Yihenew G. Selassie Mengesha",
        role: "Senior Soil Health Advisor",
        expertise: [
          "Soil Science",
          "Soil Chemistry",
          "Natural Resources Management",
        ],
        publications: 80,
        image: "yihenew-selassie.jpg",
        x: 75,
        y: 40,
      },
      {
        id: 4,
        name: "Dr. Tilaye Teklewold Deneke",
        role: "Adviser on Innovation Documentation & Scaling",
        expertise: [
          "Agricultural Socio-economics",
          "Climate Resilience",
          "Scaling Innovations",
        ],
        publications: 30,
        image: tilaye,
        x: 15,
        y: 70,
      },
    ],
    facilitators: [
      {
        id: 5,
        name: "Marta Hailemariam Mamo",
        role: "Lecturer & Change Facilitator",
        expertise: [
          "Rural Development",
          "Community Facilitation",
          "Climate-Smart Agriculture",
        ],
        projects: ["PACSMAC", "ABCDryBASIN"],
        image: marta,
        x: 50,
        y: 80,
      },
      {
        id: 6,
        name: "Melkamu Mamuye",
        role: "GIS and Remote Sensing Expert",
        expertise: [
          "GIS & Remote Sensing",
          "Climate Modeling",
          "Watershed Management",
        ],
        publications: 15,
        image: "melkamu-mamuye.jpg",
        x: 85,
        y: 70,
      },
    ],
  };

  const allMembers = [
    ...teamData.leadership,
    ...teamData.advisors,
    ...teamData.facilitators,
  ];

  const connections = [
    { from: { x: 50, y: 20 }, to: { x: 25, y: 40 } },
    { from: { x: 50, y: 20 }, to: { x: 75, y: 40 } },
    { from: { x: 50, y: 20 }, to: { x: 15, y: 70 } },
    { from: { x: 50, y: 20 }, to: { x: 50, y: 80 } },
    { from: { x: 50, y: 20 }, to: { x: 85, y: 70 } },
    { from: { x: 25, y: 40 }, to: { x: 75, y: 40 } },
    { from: { x: 75, y: 40 }, to: { x: 85, y: 70 } },
    { from: { x: 15, y: 70 }, to: { x: 50, y: 80 } },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation("gentle");
    }, 500);

    return () => clearTimeout(timer);
  }, [startAnimation]);

  const filteredMembers =
    filter === "all"
      ? allMembers
      : allMembers.filter((member) => teamData[filter]?.includes(member));

  const getRoleColor = (member) => {
    if (teamData.leadership.includes(member)) return "#4379D0";
    if (teamData.advisors.includes(member)) return "#000000";
    return "#3a6abb";
  };

  return (
    <Section id="team" backgroundColor="white" padding="large">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Our <span className="text-[#4379D0]">Human Network</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            Interdisciplinary experts working together to drive regenerative
            transformation
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === "all"
                ? "bg-[#4379D0] text-white"
                : "bg-transparent text-[#000000] border-2 border-[#4379D0] hover:bg-[#4379D0] hover:text-white"
            }`}
          >
            All Team
          </button>
          <button
            onClick={() => setFilter("leadership")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === "leadership"
                ? "bg-[#4379D0] text-white"
                : "bg-transparent text-[#000000] border-2 border-[#4379D0] hover:bg-[#4379D0] hover:text-white"
            }`}
          >
            Leadership
          </button>
          <button
            onClick={() => setFilter("advisors")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === "advisors"
                ? "bg-[#000000] text-white"
                : "bg-transparent text-[#000000] border-2 border-[#000000] hover:bg-[#000000] hover:text-white"
            }`}
          >
            Advisors
          </button>
          <button
            onClick={() => setFilter("facilitators")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              filter === "facilitators"
                ? "bg-[#3a6abb] text-white"
                : "bg-transparent text-[#000000] border-2 border-[#3a6abb] hover:bg-[#3a6abb] hover:text-white"
            }`}
          >
            Facilitators
          </button>
        </div>

        {/* Interactive Network */}
        <div className="mb-16">
          <div
            ref={containerRef}
            className="relative w-full h-96 bg-white rounded-2xl border-2 border-[#000000] border-opacity-10 mb-8"
          >
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
                  strokeOpacity="0.2"
                />
              ))}
            </svg>

            {allMembers.map((member, index) => (
              <div
                key={member.id}
                ref={(el) => registerNode(el, index)}
                onClick={() => setSelectedMember(member)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer group"
                style={{
                  left: `${member.x}%`,
                  top: `${member.y}%`,
                  borderColor: getRoleColor(member),
                }}
              >
                <div
                  className="w-16 h-16 rounded-full border-4 bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  style={{ borderColor: getRoleColor(member) }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#000000] text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {member.name}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#000000]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              variant="elevated"
              padding="medium"
              hover={true}
              onClick={() => setSelectedMember(member)}
              className="text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-[#000000] mb-2">
                {member.name}
              </h3>
              <p className="text-[#4379D0] font-semibold mb-3">{member.role}</p>
              <div className="flex justify-center space-x-2 mb-3">
                {member.expertise.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#4379D0] bg-opacity-10 text-[#fff] text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {member.publications && (
                <p className="text-sm text-[#000000] opacity-70">
                  {member.publications}+ publications
                </p>
              )}
            </Card>
          ))}
        </div>

        {/* Member Detail Modal */}

        <Modal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          size="medium"
        >
          {selectedMember && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#000000] mb-2">
                    {selectedMember.name}
                  </h3>
                  <p className="text-lg text-[#4379D0] font-semibold mb-4">
                    {selectedMember.role}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#000000] mb-2">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#4379D0] bg-opacity-10 text-[white] text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedMember.publications && (
                    <p className="text-[#000000] opacity-70">
                      <strong>{selectedMember.publications}</strong> scientific
                      publications
                    </p>
                  )}
                  {selectedMember.projects && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-[#000000] mb-2">
                        Active Projects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.projects.map((project, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#000000] bg-opacity-10 text-[#000000] text-sm rounded-full"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Section>
  );
};

export default HumanNetwork;
