// sections/Contact/SmartForm.jsx
import React, { useState } from "react";
import Section from "../../ui/Section";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const SmartForm = () => {
  const [formData, setFormData] = useState({
    stakeholderType: "",
    name: "",
    organization: "",
    email: "",
    phone: "",
    interestArea: "",
    message: "",
    collaborationType: "",
    urgency: "medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const stakeholderTypes = [
    { value: "researcher", label: "Researcher/Academic", icon: "🔬" },
    { value: "policymaker", label: "Policy Maker", icon: "🏛️" },
    { value: "processor", label: "Coffee Processor", icon: "☕" },
    { value: "community", label: "Community Representative", icon: "👨‍🌾" },
    { value: "investor", label: "Investor/Donor", icon: "💼" },
    { value: "other", label: "Other Stakeholder", icon: "🌟" },
  ];

  const collaborationTypes = {
    researcher: [
      "Research Collaboration",
      "Data Sharing",
      "Publication Partnership",
      "Student Supervision",
      "Methodology Support",
    ],
    policymaker: [
      "Policy Advice",
      "Stakeholder Consultation",
      "Regulatory Guidance",
      "Capacity Building",
      "Evidence Synthesis",
    ],
    processor: [
      "Technical Assistance",
      "Waste Management Solutions",
      "Market Linkages",
      "Training Programs",
      "Technology Adoption",
    ],
    community: [
      "Community Engagement",
      "Capacity Building",
      "Livelihood Support",
      "Awareness Programs",
      "Local Innovation",
    ],
    investor: [
      "Funding Opportunities",
      "Impact Investment",
      "Project Partnership",
      "Monitoring & Evaluation",
      "Scaling Support",
    ],
    other: [
      "General Inquiry",
      "Knowledge Sharing",
      "Networking",
      "Volunteering",
      "Media Collaboration",
    ],
  };

  const interestAreas = [
    "Coffee Waste Management",
    "Regenerative Agriculture",
    "Soil Health",
    "Water Management",
    "Community Empowerment",
    "Policy Development",
    "Climate Resilience",
    "Value Chain Development",
    "Technology Innovation",
    "Capacity Building",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset dependent fields when stakeholder type changes
    if (field === "stakeholderType") {
      setFormData((prev) => ({
        ...prev,
        stakeholderType: value,
        collaborationType: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        stakeholderType: "",
        name: "",
        organization: "",
        email: "",
        phone: "",
        interestArea: "",
        message: "",
        collaborationType: "",
        urgency: "medium",
      });
    }, 2000);
  };

  const getCurrentCollaborationTypes = () => {
    return (
      collaborationTypes[formData.stakeholderType] || collaborationTypes.other
    );
  };

  return (
    <Section id="contact-form" backgroundColor="transparent" padding="large">
      <div className="max-w-4xl mx-auto">
        <Card variant="elevated" padding="large">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-4">
              Get in <span className="text-[#4379D0]">Touch</span>
            </h2>
            <p className="text-[#000000] opacity-80">
              Tell us about your interests and how you'd like to collaborate
              with our ecosystem
            </p>
          </div>

          {submitStatus === "success" ? (
            /* Success State */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-[#000000] mb-2">
                Thank You for Reaching Out!
              </h3>
              <p className="text-[#000000] opacity-80 mb-6 max-w-md mx-auto">
                Your inquiry has been received. Our team will review it and get
                back to you within 2-3 business days.
              </p>
              <Button onClick={() => setSubmitStatus(null)} variant="secondary">
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stakeholder Type Selection */}
              <div>
                <label className="block text-[#000000] font-semibold mb-3">
                  I am a... *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stakeholderTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        handleInputChange("stakeholderType", type.value)
                      }
                      className={`
                        p-4 rounded-lg border-2 text-center transition-all duration-200
                        ${
                          formData.stakeholderType === type.value
                            ? "border-[#4379D0] bg-[#4379D0] bg-opacity-10 text-[#fff] transform scale-105"
                            : "border-[#000000] border-opacity-20 text-[#000000] hover:border-[#4379D0] hover:text-[#4379D0]"
                        }
                      `}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#000000] font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[#000000] font-semibold mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      handleInputChange("organization", e.target.value)
                    }
                    className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    placeholder="Your organization name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#000000] font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#000000] font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    placeholder="+251 ___ ______"
                  />
                </div>
              </div>

              {/* Dynamic Fields Based on Stakeholder Type */}
              {formData.stakeholderType && (
                <>
                  <div>
                    <label className="block text-[#000000] font-semibold mb-2">
                      Type of Collaboration
                    </label>
                    <select
                      value={formData.collaborationType}
                      onChange={(e) =>
                        handleInputChange("collaborationType", e.target.value)
                      }
                      className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    >
                      <option value="">Select collaboration type</option>
                      {getCurrentCollaborationTypes().map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#000000] font-semibold mb-2">
                      Area of Interest
                    </label>
                    <select
                      value={formData.interestArea}
                      onChange={(e) =>
                        handleInputChange("interestArea", e.target.value)
                      }
                      className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200"
                    >
                      <option value="">Select area of interest</option>
                      {interestAreas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="block text-[#000000] font-semibold mb-2">
                  Your Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows="6"
                  className="w-full p-3 border-2 border-[#000000] border-opacity-20 rounded-lg focus:border-[#4379D0] focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Please describe your inquiry, collaboration interest, or specific questions..."
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-[#000000] font-semibold mb-2">
                  Urgency Level
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: "low", label: "Low", color: "bg-green-500" },
                    {
                      value: "medium",
                      label: "Medium",
                      color: "bg-yellow-500",
                    },
                    { value: "high", label: "High", color: "bg-red-500" },
                  ].map((level) => (
                    <label
                      key={level.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={(e) =>
                          handleInputChange("urgency", e.target.value)
                        }
                        className="text-[#4379D0] focus:ring-[#4379D0]"
                      />
                      <span className="text-[#000000]">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button
                  type="submit"
                  size="large"
                  loading={isSubmitting}
                  disabled={
                    !formData.stakeholderType ||
                    !formData.name ||
                    !formData.email ||
                    !formData.message
                  }
                  fullWidth
                >
                  {isSubmitting ? "Submitting..." : "Submit Your Inquiry"}
                </Button>
                <p className="text-sm text-[#000000] opacity-70 mt-3">
                  We'll respond within 2-3 business days
                </p>
              </div>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

export default SmartForm;
