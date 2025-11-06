// sections/Insights/MasonryGrid.jsx
import React, { useState, useEffect } from "react";
import insightsData from "../../../assets/data/insights.json";
import InsightCard from "./InsightCards";
import FilterSystem from "./FilterSystem";

const MasonryGrid = () => {
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    types: [],
  });

  const { content, categories } = insightsData;

  // Apply filters whenever activeFilters change
  useEffect(() => {
    let filtered = [...content];

    // Filter by categories
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((insight) =>
        activeFilters.categories.includes(insight.category)
      );
    }

    // Filter by types
    if (activeFilters.types.length > 0) {
      filtered = filtered.filter((insight) =>
        activeFilters.types.includes(insight.type)
      );
    }

    setFilteredInsights(filtered);
  }, [activeFilters, content]);

  // Get unique content types for filtering
  const contentTypes = [...new Set(content.map((item) => item.type))];

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      categories: [],
      types: [],
    });
  };

  // Calculate masonry columns based on screen size
  const getColumnCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Distribute insights into columns for masonry layout
  const distributeIntoColumns = (items, columns) => {
    const columnHeights = new Array(columns).fill(0);
    const columnItems = new Array(columns).fill().map(() => []);

    items.forEach((item) => {
      // Find the column with the minimum height
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnItems[shortestColumnIndex].push(item);
      // Estimate height based on content length
      columnHeights[shortestColumnIndex] += item.keyPoints
        ? item.keyPoints.length * 20
        : 100;
    });

    return columnItems;
  };

  const columnItems = distributeIntoColumns(filteredInsights, columnCount);

  return (
    <section id="insights" className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Insights & <span className="text-[#4379D0]">Evidence</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto">
            Research findings, project updates, and knowledge sharing from our
            work in regenerative food systems
          </p>
        </div>

        {/* Filter System */}
        <FilterSystem
          categories={categories}
          contentTypes={contentTypes}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          resultCount={filteredInsights.length}
          totalCount={content.length}
        />

        {/* Masonry Grid */}
        {filteredInsights.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {columnItems.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-6">
                {column.map((insight, index) => (
                  <InsightCard
                    key={`${insight.id}-${index}`}
                    insight={insight}
                    category={categories.find(
                      (cat) => cat.id === insight.category
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#000000] mb-2">
              No insights found
            </h3>
            <p className="text-[#000000] opacity-70 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#4379D0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More (for future pagination) */}
        {filteredInsights.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-transparent text-[#4379D0] border-2 border-[#4379D0] px-8 py-3 rounded-lg font-semibold hover:bg-[#4379D0] hover:text-white transition-all duration-200">
              Load More Insights
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MasonryGrid;
