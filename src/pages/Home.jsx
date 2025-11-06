// pages/Home.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navigation from "../components/layout/Navigation";
import Hero from "../components/sections/Home/Hero";
import ScrollingNarrative from "../components/sections/Home/ScrollingNarrative";
import Ecosystem from "../components/sections/Home/Ecosystem";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <Hero />
        <ScrollingNarrative />
        <Ecosystem />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
