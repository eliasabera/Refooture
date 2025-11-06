// sections/Contact/EngagementFlow.jsx
import React, { useState } from "react";
import Section from "../../ui/Section";
import Card from "../../ui/Card";

const EngagementFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const engagementSteps = [
    {
      step: 1,
      title: "Submit Your Inquiry",
      description:
        "Tell us about your interests, questions, or collaboration ideas using our smart form",
      icon: "📝",
      details: [
        "Choose your stakeholder type",
        "Describe your interest or need",
        "Provide contact information",
      ],
    },
    {
      step: 2,
      title: "Review by FSIP Team",
      description:
        "Our Food System Innovation Platform team reviews and categorizes your inquiry",
      icon: "👥",
      details: [
        "Multi-stakeholder review process",
        "Match with relevant expertise",
        "Identify potential synergies",
      ],
    },
    {
      step: 3,
      title: "Connect with Stakeholders",
      description:
        "We facilitate introductions to the most relevant team members or partners",
      icon: "🔗",
      details: [
        "Direct connection to experts",
        "Introduction to relevant projects",
        "Access to community platforms",
      ],
    },
    {
      step: 4,
      title: "Collaborate & Co-create",
      description:
        "Join our ecosystem and participate in co-creating regenerative solutions",
      icon: "🚀",
      details: [
        "Participate in workshops",
        "Join research activities",
        "Co-develop innovations",
      ],
    },
  ];

  const stakeholderTypes = [
    {
      type: "researcher",
      title: "Researcher/Academic",
      description:
        "Universities, research institutions, individual researchers",
      icon: "🔬",
      benefits: [
        "Access to field data",
        "Research collaboration",
        "Publication opportunities",
      ],
    },
    {
      type: "policymaker",
      title: "Policy Maker",
      description: "Government agencies, regulatory bodies, policy influencers",
      icon: "🏛️",
      benefits: [
        "Evidence-based insights",
        "Policy briefings",
        "Stakeholder consultations",
      ],
    },
    {
      type: "processor",
      title: "Coffee Processor",
      description: "Coffee washing stations, private processors, cooperatives",
      icon: "☕",
      benefits: [
        "Technical solutions",
        "Waste management support",
        "Market linkages",
      ],
    },
    {
      type: "community",
      title: "Community Representative",
      description: "Farmers, local residents, community organizations",
      icon: "👨‍🌾",
      benefits: [
        "Capacity building",
        "Participation in projects",
        "Livelihood opportunities",
      ],
    },
    {
      type: "investor",
      title: "Investor/Donor",
      description:
        "Funding organizations, impact investors, development partners",
      icon: "💼",
      benefits: [
        "Impact investment opportunities",
        "Project partnerships",
        "Monitoring and evaluation",
      ],
    },
    {
      type: "other",
      title: "Other Stakeholder",
      description: "NGOs, media, students, general public",
      icon: "🌟",
      benefits: [
        "Knowledge sharing",
        "Networking opportunities",
        "Learning resources",
      ],
    },
  ];

  return (
    <Section id="engagement" backgroundColor="white" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Engagement <span className="text-[#4379D0]">Process</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            How we connect, collaborate, and co-create with diverse stakeholders
            in our ecosystem
          </p>
        </div>

        {/* Engagement Flow Steps */}
        <div className="mb-16">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#000000] bg-opacity-10 hidden md:block">
              <div
                className="absolute top-0 left-0 w-1 bg-[#4379D0] transition-all duration-500"
                style={{
                  height: `${
                    (activeStep / (engagementSteps.length - 1)) * 100
                  }%`,
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="space-y-8 md:space-y-12">
              {engagementSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="flex flex-col md:flex-row items-start gap-6 cursor-pointer group"
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Indicator */}
                  <div
                    className={`
                    flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border-4 relative z-10 transition-all duration-300
                    ${
                      activeStep === index
                        ? "bg-[#4379D0] border-[#4379D0] text-white scale-110"
                        : "bg-white border-[#000000] border-opacity-30 text-[#000000] group-hover:border-[#4379D0]"
                    }
                  `}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#4379D0] text-white rounded-full text-xs flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <Card
                    variant={activeStep === index ? "elevated" : "default"}
                    padding="medium"
                    className={`flex-1 transition-all duration-300 ${
                      activeStep === index
                        ? "transform -translate-y-1 border-[#4379D0]"
                        : "opacity-80 group-hover:opacity-100"
                    }`}
                  >
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        activeStep === index
                          ? "text-[#4379D0]"
                          : "text-[#000000]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[#000000] opacity-80 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center text-[#000000] opacity-70 text-sm"
                        >
                          <div className="w-1 h-1 bg-[#4379D0] rounded-full mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stakeholder Types */}
        <div>
          <h3 className="text-3xl font-bold text-[#000000] text-center mb-8">
            Who Can Engage With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholderTypes.map((stakeholder) => (
              <Card
                key={stakeholder.type}
                variant="default"
                padding="medium"
                hover={true}
                className="text-center group hover:border-[#4379D0] transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stakeholder.icon}
                </div>
                <h4 className="text-lg font-bold text-[#000000] mb-2">
                  {stakeholder.title}
                </h4>
                <p className="text-[#000000] opacity-70 text-sm mb-4">
                  {stakeholder.description}
                </p>
                <div className="space-y-2">
                  {stakeholder.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="text-xs text-[#fff] font-medium px-2 py-1 bg-[#4379D0] bg-opacity-10 rounded-full"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card
            variant="outlined"
            padding="large"
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-4">
              Ready to Engage?
            </h3>
            <p className="text-[#000000] opacity-80 mb-6">
              Join our growing network of stakeholders committed to transforming
              food systems in Ethiopia
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact-form")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#4379D0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
            >
              Start Your Engagement Journey
            </button>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default EngagementFlow;
