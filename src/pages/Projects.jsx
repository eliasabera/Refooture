// pages/Projects.jsx
import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navigation from "../components/layout/Navigation";
import InteractiveLandscape from "../components/sections/Projects/InteractiveLandscape";
import ProjectHotspots from "../components/sections/Projects/ProjectHotspots";
import SolutionModal from "../components/sections/Projects/SolutionModal";

const Projects = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <InteractiveLandscape />
        <ProjectHotspots />
      </main>

      <Footer />

      {/* Global Modals */}
      <SolutionModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        projectId={activeModal}
      />
    </div>
  );
};

export default Projects;
