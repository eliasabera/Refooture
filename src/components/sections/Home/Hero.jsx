// sections/Home/Hero.jsx
import React from "react";
import Button from "../../ui/Button";
import AnimatedCounter from "../../ui/AnimatedCounter";
import { useAnimation } from "../../../contexts/AnimationContext";

const Hero = () => {
  const { startAnimation, isAnimationCompleted } = useAnimation();

  React.useEffect(() => {
    startAnimation("heroSection");
  }, [startAnimation]);

  const stats = [
    { value: 97, label: "Agrarian Households", suffix: "%" },
    { value: 400, label: "Processing Stations" },
    { value: 245, label: "Publications" },
    { value: 8, label: "PhD Researchers" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#4379D0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#4379D0] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[#000000] mb-6 leading-tight">
            Regenerating
            <span className="block text-[#4379D0]">Food Systems</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#000000] opacity-80 mb-8 leading-relaxed">
            Transforming coffee waste into wealth through innovative, inclusive
            solutions in Ethiopia's Wanja Kerssa landscape
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="large"
            onClick={() =>
              document
                .getElementById("projects")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Our Work
          </Button>
          <Button
            variant="secondary"
            size="large"
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Involved
          </Button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4379D0] mb-2">
                <AnimatedCounter
                  end={stat.value}
                  duration={2000}
                  delay={index * 300}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm md:text-base text-[#000000] opacity-70 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#4379D0] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#4379D0] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
