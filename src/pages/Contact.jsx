// pages/Contact.jsx
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Navigation from "../components/layout/Navigation";
import EngagementFlow from "../components/sections/Contact/EngagementFlow";
import SmartForm from "../components/sections/Contact/SmartForm";
import CollaborationFeed from "../components/sections/Contact/CollaborationFeed";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

      <main>
        <EngagementFlow />
        <SmartForm />
        <CollaborationFeed />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
