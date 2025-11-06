// pages/About.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navigation from "../components/layout/Navigation";
import HumanNetwork from "../components/sections/About/HumanNetwork";
import DNAPrinciples from "../components/sections/About/DNAPrinciples";
import TeamProfiles from "../components/sections/About/TeamProfiles";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <HumanNetwork />
        <DNAPrinciples />
        <TeamProfiles />
      </main>

      <Footer />
    </div>
  );
};

export default About;
