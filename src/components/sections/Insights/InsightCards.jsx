// sections/Insights/InsightCards.jsx
import React, { useState } from "react";
import Card from "../../ui/Card";
import Modal from "../../ui/Modal";

const InsightCard = ({ insight, category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTypeColor = (type) => {
    const colors = {
      "Issue Paper": "#4379D0",
      "Workshop Report": "#000000",
      "News Brief": "#3a6abb",
      "Research Publication": "#2a4a8a",
    };
    return colors[type] || "#4379D0";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      "Issue Paper": "📄",
      "Workshop Report": "👥",
      "News Brief": "📰",
      "Research Publication": "🔬",
    };
    return icons[type] || "📄";
  };

  return (
    <>
      <Card
        variant="elevated"
        padding="medium"
        hover={true}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer h-full flex flex-col transition-all duration-300 hover:transform hover:-translate-y-1"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getTypeIcon(insight.type)}</span>
            <span
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${getTypeColor(insight.type)}20`,
                color: getTypeColor(insight.type),
              }}
            >
              {insight.type}
            </span>
          </div>
          <span className="text-sm text-[#000000] opacity-70">
            {formatDate(insight.date)}
          </span>
        </div>

        {/* Category */}
        {category && (
          <span className="inline-block px-3 py-1 bg-[#000000] bg-opacity-5 text-[#fff] rounded-full text-sm font-medium mb-3">
            {category.name}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-[#000000] mb-3 line-clamp-2">
          {insight.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#000000] opacity-70 mb-4 line-clamp-3 flex-grow">
          {insight.excerpt}
        </p>

        {/* Key Points Preview */}
        {insight.keyPoints && insight.keyPoints.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {insight.keyPoints.slice(0, 2).map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-[#000000] opacity-70"
                >
                  <div className="w-1 h-1 bg-[#4379D0] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span className="line-clamp-2">{point}</span>
                </li>
              ))}
            </ul>
            {insight.keyPoints.length > 2 && (
              <p className="text-sm text-[#4379D0] font-semibold mt-1">
                +{insight.keyPoints.length - 2} more points
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-[#000000] border-opacity-10">
          <span className="text-[#4379D0] font-semibold text-sm">
            Read More →
          </span>
          {insight.fileUrl && (
            <span className="text-[#000000] opacity-50 text-sm">📎 PDF</span>
          )}
        </div>
      </Card>

      {/* Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="large"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{getTypeIcon(insight.type)}</span>
                <div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${getTypeColor(insight.type)}20`,
                      color: getTypeColor(insight.type),
                    }}
                  >
                    {insight.type}
                  </span>
                  {category && (
                    <span className="ml-2 px-3 py-1 bg-[#000000] bg-opacity-5 text-[#fff] rounded-full text-sm font-medium">
                      {category.name}
                    </span>
                  )}
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#000000] mb-2">
                {insight.title}
              </h2>
              <p className="text-lg text-[#000000] opacity-70">
                {insight.excerpt}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#000000] opacity-70 mb-2">
                Published on
              </div>
              <div className="font-semibold text-[#000000]">
                {formatDate(insight.date)}
              </div>
            </div>
          </div>

          {/* Key Points */}
          {insight.keyPoints && insight.keyPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#000000] mb-4">
                Key Points
              </h3>
              <ul className="space-y-3">
                {insight.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start text-[#000000] opacity-80"
                  >
                    <div className="w-2 h-2 bg-[#4379D0] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* File Download */}
          {insight.fileUrl && (
            <div className="mb-6 p-4 bg-[#4379D0] bg-opacity-5 rounded-lg border border-[#4379D0] border-opacity-20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#000000] mb-1">
                    Download Full Document
                  </h4>
                  <p className="text-[#000000] opacity-70 text-sm">
                    Access the complete {insight.type.toLowerCase()} for
                    detailed information
                  </p>
                </div>
                <a
                  href={insight.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4379D0] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>📎</span>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-[#000000] border-opacity-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-[#4379D0] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
            >
              Close
            </button>
            <div className="text-sm text-[#000000] opacity-70">
              REFOOTURE Knowledge Base
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InsightCard;
