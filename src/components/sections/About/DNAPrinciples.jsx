// sections/About/DNAPrinciples.jsx
import React, { useState, useRef } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import Section from "../../ui/Section";
import Card from "../../ui/Card";

const DNAPrinciples = () => {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const { registerElement } = useScrollAnimation();
  const sectionRef = useRef(null);

  const principles = [
    {
      id: "sense-of-place",
      title: "Sense of Place and Purpose",
      description:
        "Grounding innovations in local contexts, cultures, and community aspirations while maintaining alignment with broader regenerative goals.",
      icon: "📍",
      practices: [
        "Community-led needs assessment",
        "Cultural context integration",
        "Local knowledge validation",
      ],
    },
    {
      id: "ecological-design",
      title: "Ecological Design for Innovation",
      description:
        "Creating solutions that work with natural systems, enhance biodiversity, and regenerate ecosystem services rather than depleting them.",
      icon: "🌱",
      practices: [
        "Nature-based solutions",
        "Biodiversity enhancement",
        "Circular economy principles",
      ],
    },
    {
      id: "connectedness",
      title: "Connectedness",
      description:
        "Fostering strong relationships and collaboration among all stakeholders—thinkers, enablers, and doers—across the food system.",
      icon: "🔄",
      practices: [
        "Multi-stakeholder platforms",
        "Knowledge sharing networks",
        "Cross-sector collaboration",
      ],
    },
    {
      id: "fair-transition",
      title: "Fair, Just and Inclusive Transition",
      description:
        "Ensuring that the benefits of food system transformation are shared equitably, with particular attention to disadvantaged groups.",
      icon: "⚖️",
      practices: [
        "Gender and social equity",
        "Youth and women empowerment",
        "Inclusive decision-making",
      ],
    },
    {
      id: "living-process",
      title: "Living Process",
      description:
        "Embracing adaptation, learning, and continuous improvement through real-world experimentation and community feedback.",
      icon: "📈",
      practices: [
        "Adaptive management",
        "Continuous learning cycles",
        "Community feedback integration",
      ],
    },
  ];

  React.useEffect(() => {
    registerElement(sectionRef.current, {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
    });
  }, [registerElement]);

  return (
    <Section
      id="principles"
      backgroundColor="transparent"
      padding="large"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Our <span className="text-[#4379D0]">DNA Principles</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            The core values that guide our approach to regenerative and
            inclusive food systems transformation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Principles Navigation */}
          <div className="space-y-4">
            {principles.map((principle, index) => (
              <button
                key={principle.id}
                onClick={() => setActivePrinciple(index)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 border-2 ${
                  activePrinciple === index
                    ? "border-[#4379D0] bg-[#4379D0] bg-opacity-5 transform -translate-y-1 shadow-lg"
                    : "border-[#000000] border-opacity-10 hover:border-[#4379D0] hover:bg-[#4379D0] hover:bg-opacity-5"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">{principle.icon}</div>
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        activePrinciple === index
                          ? "text-[#4379D0]"
                          : "text-[#000000]"
                      }`}
                    >
                      {principle.title}
                    </h3>
                    <p className="text-[#000000] opacity-70 text-sm leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Principle Detail */}
          <Card variant="elevated" padding="large" className="sticky top-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">
                {principles[activePrinciple].icon}
              </div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                {principles[activePrinciple].title}
              </h3>
              <p className="text-[#000000] opacity-80 leading-relaxed">
                {principles[activePrinciple].description}
              </p>
            </div>

            <div className="border-t border-[#000000] border-opacity-10 pt-6">
              <h4 className="font-semibold text-[#000000] mb-4 text-center">
                Key Practices
              </h4>
              <ul className="space-y-3">
                {principles[activePrinciple].practices.map(
                  (practice, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[#000000] opacity-80"
                    >
                      <div className="w-2 h-2 bg-[#4379D0] rounded-full mr-3 flex-shrink-0"></div>
                      {practice}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Implementation Example */}
            <div className="mt-6 p-4 bg-[#4379D0] bg-opacity-5 rounded-lg">
              <h4 className="font-semibold text-[#000000] mb-2">In Action:</h4>
              <p className="text-[#000000] opacity-80 text-sm">
                {activePrinciple === 0 &&
                  "Community workshops in Wanja Kerssa ensure local voices shape project direction"}
                {activePrinciple === 1 &&
                  "Vetiver grass implementation for natural wastewater treatment"}
                {activePrinciple === 2 &&
                  "Food System Innovation Platform (FSIP) connecting diverse stakeholders"}
                {activePrinciple === 3 &&
                  "Prioritizing eight disadvantaged groups in project interventions"}
                {activePrinciple === 4 &&
                  "Regular feedback loops and adaptive management in coffee waste projects"}
              </p>
            </div>
          </Card>
        </div>

        {/* Values Summary */}
        <div className="mt-16 text-center">
          <Card
            variant="outlined"
            padding="large"
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-[#000000] mb-4">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-[#4379D0] mb-2">
                  Regeneration
                </h4>
                <p className="text-[#000000] opacity-70 text-sm">
                  Going beyond sustainability to actively restore and enhance
                  ecological and social systems
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#4379D0] mb-2">Inclusion</h4>
                <p className="text-[#000000] opacity-70 text-sm">
                  Ensuring all voices are heard, particularly those of
                  disadvantaged and marginalized communities
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#4379D0] mb-2">
                  Collaboration
                </h4>
                <p className="text-[#000000] opacity-70 text-sm">
                  Breaking down silos and working across disciplines, sectors,
                  and institutions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default DNAPrinciples;
