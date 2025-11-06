// sections/About/TeamProfiles.jsx
import React from "react";
import Section from "../../ui/Section";
import Card from "../../ui/Card";
import AnimatedCounter from "../../ui/AnimatedCounter";

const TeamProfiles = () => {
  const teamStats = [
    { number: 245, label: "Scientific Publications", suffix: "+" },
    { number: 8, label: "PhD Researchers", suffix: "+" },
    { number: 58, label: "MSc Graduates", suffix: "+" },
    { number: 20, label: "Projects Coordinated", suffix: "+" },
  ];

  const expertiseAreas = [
    "Agricultural Economics",
    "Soil Science",
    "Coffee Research",
    "GIS & Remote Sensing",
    "Community Development",
    "Climate Resilience",
    "Policy Analysis",
    "Value Chain Development",
  ];

  return (
    <Section id="expertise" backgroundColor="white" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Collective <span className="text-[#4379D0]">Expertise</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            Bringing together decades of experience across multiple disciplines
            to drive meaningful change
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {teamStats.map((stat, index) => (
            <Card
              key={stat.label}
              variant="default"
              padding="medium"
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#4379D0] mb-2">
                <AnimatedCounter
                  end={stat.number}
                  duration={2000}
                  delay={index * 300}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm md:text-base text-[#000000] opacity-70 font-medium">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Expertise Areas */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#000000] text-center mb-8">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {expertiseAreas.map((area, index) => (
              <Card
                key={area}
                variant="outlined"
                padding="small"
                className="text-center hover:bg-[#4379D0] hover:text-white transition-all duration-300 cursor-default"
              >
                <div className="text-[#000000] hover:text-white text-sm font-medium">
                  {area}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Impact */}
        <Card variant="elevated" padding="large" className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#000000] mb-4">
                Project Impact & Reach
              </h3>
              <p className="text-[#000000] opacity-80 mb-6 leading-relaxed">
                Our team's collaborative approach has enabled significant impact
                across multiple dimensions of food system transformation in
                Ethiopia.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#000000] font-medium">
                    Households Reached
                  </span>
                  <span className="text-[#4379D0] font-bold">97%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#000000] font-medium">
                    Wet Processing Stations
                  </span>
                  <span className="text-[#4379D0] font-bold">400+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#000000] font-medium">
                    Community Workshops
                  </span>
                  <span className="text-[#4379D0] font-bold">50+</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-[#000000] opacity-50">
                <div className="text-6xl mb-2">📊</div>
                <div>Impact Visualization</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card
            variant="outlined"
            padding="large"
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-[#000000] mb-4">
              Join Our Mission
            </h3>
            <p className="text-[#000000] opacity-80 mb-6">
              We're always looking for passionate individuals and organizations
              to collaborate with on our journey towards regenerative food
              systems.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#4379D0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
            >
              Connect With Our Team
            </button>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default TeamProfiles;
