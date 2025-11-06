// sections/Contact/CollaborationFeed.jsx
import React, { useState, useEffect } from "react";
import Section from "../../ui/Section";
import Card from "../../ui/Card";

const CollaborationFeed = () => {
  const [collaborations, setCollaborations] = useState([]);

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockCollaborations = [
      {
        id: 1,
        type: "research",
        title: "New Research Partnership",
        description:
          "University of Nairobi researchers joined forces with our soil health team",
        timestamp: "2 hours ago",
        stakeholders: ["Researcher", "Soil Expert"],
        status: "active",
      },
      {
        id: 2,
        type: "community",
        title: "Community Workshop Success",
        description:
          "50+ farmers trained in regenerative coffee processing techniques",
        timestamp: "1 day ago",
        stakeholders: ["Farmers", "Community Facilitator"],
        status: "completed",
      },
      {
        id: 3,
        type: "policy",
        title: "Policy Dialogue Initiated",
        description:
          "Engaging with regional policymakers on coffee waste regulations",
        timestamp: "3 days ago",
        stakeholders: ["Policy Maker", "Technical Advisor"],
        status: "active",
      },
      {
        id: 4,
        type: "innovation",
        title: "New Technology Pilot",
        description:
          "Testing water-efficient processing machines with local cooperatives",
        timestamp: "1 week ago",
        stakeholders: ["Coffee Processor", "Technology Expert"],
        status: "testing",
      },
      {
        id: 5,
        type: "capacity",
        title: "Youth Training Program",
        description:
          "Empowering young entrepreneurs in waste valorization businesses",
        timestamp: "2 weeks ago",
        stakeholders: ["Youth", "Business Mentor"],
        status: "active",
      },
      {
        id: 6,
        type: "research",
        title: "Data Sharing Agreement",
        description:
          "New partnership for climate and agricultural data exchange",
        timestamp: "3 weeks ago",
        stakeholders: ["Researcher", "Data Scientist"],
        status: "completed",
      },
    ];
    setCollaborations(mockCollaborations);
  }, []);

  const getTypeIcon = (type) => {
    const icons = {
      research: "🔬",
      community: "👥",
      policy: "🏛️",
      innovation: "💡",
      capacity: "📚",
    };
    return icons[type] || "🌟";
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      testing: "bg-yellow-100 text-yellow-800",
      planned: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type) => {
    const colors = {
      research: "#4379D0",
      community: "#000000",
      policy: "#3a6abb",
      innovation: "#2a4a8a",
      capacity: "#1a3a7a",
    };
    return colors[type] || "#4379D0";
  };

  return (
    <Section backgroundColor="white" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
            Recent <span className="text-[#4379D0]">Collaborations</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            See how stakeholders are connecting and creating impact through our
            platform
          </p>
        </div>

        {/* Collaboration Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {collaborations.map((collab) => (
            <Card
              key={collab.id}
              variant="default"
              padding="medium"
              hover={true}
              className="group transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${getTypeColor(collab.type)}20` }}
                >
                  <span style={{ color: getTypeColor(collab.type) }}>
                    {getTypeIcon(collab.type)}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    collab.status
                  )}`}
                >
                  {collab.status}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[#000000] mb-2 group-hover:text-[#4379D0] transition-colors duration-200">
                {collab.title}
              </h3>
              <p className="text-[#000000] opacity-70 text-sm mb-4 leading-relaxed">
                {collab.description}
              </p>

              {/* Stakeholders */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {collab.stakeholders.map((stakeholder, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#000000] bg-opacity-5 text-[#fff] text-xs rounded-full"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-[#000000] border-opacity-10">
                <span className="text-xs text-[#000000] opacity-50">
                  {collab.timestamp}
                </span>
                <button className="text-[#4379D0] text-sm font-semibold hover:text-[#3a6abb] transition-colors duration-200">
                  Learn More →
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card variant="elevated" padding="large">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#4379D0] mb-2">50+</div>
              <div className="text-[#000000] opacity-70 text-sm">
                Active Collaborations
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#4379D0] mb-2">12</div>
              <div className="text-[#000000] opacity-70 text-sm">
                Countries Represented
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#4379D0] mb-2">200+</div>
              <div className="text-[#000000] opacity-70 text-sm">
                Stakeholders Connected
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#4379D0] mb-2">15</div>
              <div className="text-[#000000] opacity-70 text-sm">
                Projects Initiated
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#000000] opacity-80 mb-6">
            Ready to start your own collaboration journey?
          </p>
          <button
            onClick={() =>
              document
                .getElementById("contact-form")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#4379D0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
          >
            Join the Collaboration Network
          </button>
        </div>
      </div>
    </Section>
  );
};

export default CollaborationFeed;
