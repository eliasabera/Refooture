// sections/Projects/SolutionModal.jsx
import React, { useState } from "react";
import Modal from "../../ui/Modal";
import projectsData from "../../../assets/data/projects.json";

const SolutionModal = ({ isOpen, onClose, projectId }) => {
  const [activeTab, setActiveTab] = useState("challenges");

  const { featured, otherProjects } = projectsData;

  const project =
    projectId === featured.id
      ? featured
      : otherProjects.find((p) => p.id === projectId);

  if (!project) return null;

  const tabs = [
    { id: "challenges", label: "Challenges", icon: "⚠️" },
    { id: "solutions", label: "Solutions", icon: "💡" },
    { id: "impact", label: "Impact", icon: "📈" },
    { id: "partners", label: "Partners", icon: "🤝" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "challenges":
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-[#000000] text-lg">
              Key Challenges
            </h4>
            <ul className="space-y-3">
              {project.challenges?.map((challenge, index) => (
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
        );

      case "solutions":
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-[#000000] text-lg">
              Proposed Solutions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.solutions?.map((solution, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#4379D0] bg-opacity-5 rounded-lg border border-[#4379D0] border-opacity-20"
                >
                  <h5 className="font-semibold text-[#000000] mb-2">
                    {solution.title}
                  </h5>
                  <p className="text-[#000000] opacity-70 text-sm mb-2">
                    {solution.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#4379D0] text-sm font-semibold">
                      {solution.impact}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        solution.status === "Implemented"
                          ? "bg-green-100 text-green-800"
                          : solution.status === "Testing"
                          ? "bg-yellow-100 text-yellow-800"
                          : solution.status === "Planned"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {solution.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "impact":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-[#4379D0] bg-opacity-5 rounded-lg">
                <div className="text-2xl font-bold text-[#4379D0]">80%</div>
                <div className="text-sm text-[#000000] opacity-70">
                  Pollution Reduction
                </div>
              </div>
              <div className="text-center p-4 bg-[#4379D0] bg-opacity-5 rounded-lg">
                <div className="text-2xl font-bold text-[#4379D0]">60%</div>
                <div className="text-sm text-[#000000] opacity-70">
                  Water Savings
                </div>
              </div>
              <div className="text-center p-4 bg-[#4379D0] bg-opacity-5 rounded-lg">
                <div className="text-2xl font-bold text-[#4379D0]">50+</div>
                <div className="text-sm text-[#000000] opacity-70">
                  Households Reached
                </div>
              </div>
              <div className="text-center p-4 bg-[#4379D0] bg-opacity-5 rounded-lg">
                <div className="text-2xl font-bold text-[#4379D0]">8</div>
                <div className="text-sm text-[#000000] opacity-70">
                  Partner Organizations
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-[#000000] mb-3">
                Expected Outcomes
              </h5>
              <ul className="space-y-2 text-[#000000] opacity-80">
                <li>• Improved water quality in local streams and rivers</li>
                <li>• Reduced health risks for nearby communities</li>
                <li>• New income opportunities from waste valorization</li>
                <li>• Enhanced soil fertility through compost production</li>
                <li>
                  • Strengthened community capacity for environmental management
                </li>
              </ul>
            </div>
          </div>
        );

      case "partners":
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-[#000000] text-lg">
              Collaborating Partners
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.partners?.map((partner, index) => (
                <div
                  key={index}
                  className="p-4 bg-white border border-[#000000] border-opacity-10 rounded-lg text-center"
                >
                  <div className="w-12 h-12 bg-[#4379D0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#4379D0] font-bold text-lg">
                      {partner
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="font-semibold text-[#000000]">{partner}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#000000] mb-2">
              {project.title}
            </h2>
            <p className="text-xl text-[#4379D0] opacity-80">
              {project.tagline}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-[#4379D0] text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
              {project.status}
            </div>
            <div className="text-sm text-[#000000] opacity-70">
              {project.landscape}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#000000] border-opacity-10 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? "border-[#4379D0] text-[#4379D0]"
                    : "border-transparent text-[#000000] opacity-70 hover:opacity-100"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">{renderContent()}</div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#000000] border-opacity-10">
          <div className="text-sm text-[#000000] opacity-70">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <button
            onClick={onClose}
            className="bg-[#4379D0] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SolutionModal;
