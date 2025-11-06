// pages/Insights.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navigation from "../components/layout/Navigation";
import MasonryGrid from "../components/sections/Insights/MasonryGrid";

const Insights = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <MasonryGrid />
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
