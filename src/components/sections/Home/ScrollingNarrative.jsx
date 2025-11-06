// sections/Home/ScrollingNarrative.jsx
import React, { useRef, useEffect, useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import Card from "../../ui/Card";
import Section from "../../ui/Section";
import coffee from "../../../assets/images/projects/1.jpg";
import wanji from "../../../assets/images/projects/wanji.jpg";
import vetiver from "../../../assets/images/projects/vetiver-grass.jpg";
import community from "../../../assets/images/projects/community.jpg";    


const ScrollingNarrative = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { registerElement } = useScrollAnimation();
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  const narrativeSteps = [
    {
      title: "The Challenge",
      content:
        "Coffee processing in Ethiopia generates substantial waste, with wet processing methods using 5-15 liters of water per kilogram of coffee. This creates severe environmental degradation and health risks for local communities.",
      stat: "400+ wet processing installations",
      image: coffee,
    },
    {
      title: "The Impact",
      content:
        "Untreated coffee effluents deplete oxygen in water bodies, cause soil acidification, and pose serious health threats including respiratory diseases and waterborne illnesses for communities near processing sites.",
      stat: "35.8% forest degradation reported",
      image: wanji,
    },
    {
      title: "The Solution",
      content:
        "Through the REFOOTURE project, we're implementing regenerative solutions including constructed wetlands, vetiver grass filtration, and waste valorization to transform environmental challenges into economic opportunities.",
      stat: "75% adoption of crop rotation",
      image: vetiver,
    },
    {
      title: "The Future",
      content:
        "By building agency for disadvantaged groups and fostering multi-stakeholder collaboration, we're creating sustainable, inclusive food systems that benefit both people and the planet.",
      stat: "8 priority groups identified",
      image: community,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    registerElement(sectionRef.current, {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
    });
  }, [registerElement]);

  return (
    <Section
      id="narrative"
      backgroundColor="transparent"
      padding="xlarge"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            From Challenge to{" "}
            <span className="text-[#4379D0]">Opportunity</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            A journey through the transformative work happening in Wanja Kerssa
          </p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-[#000000] bg-opacity-10 hidden md:block">
            <div
              className="absolute top-0 left-0 w-1 bg-[#4379D0] transition-all duration-500"
              style={{
                height: `${(activeStep / (narrativeSteps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {narrativeSteps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className="flex flex-col md:flex-row items-start gap-8"
              >
                {/* Step Indicator */}
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-white border-4 border-[#4379D0] text-[#4379D0] font-bold text-lg z-10 relative">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Card
                    variant="elevated"
                    padding="large"
                    className={`transition-all duration-500 ${
                      activeStep === index
                        ? "transform -translate-y-2"
                        : "opacity-70"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-[#000000] mb-4">
                          {step.title}
                        </h3>
                        <p className="text-[#000000] opacity-80 leading-relaxed mb-4">
                          {step.content}
                        </p>
                        <div className="text-lg font-semibold text-[#4379D0]">
                          {step.stat}
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg h-64 lg:h-80 flex items-center justify-center overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ScrollingNarrative;
