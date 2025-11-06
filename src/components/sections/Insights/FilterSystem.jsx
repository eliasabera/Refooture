// sections/Insights/FilterSystem.jsx
import React, { useState } from "react";

const FilterSystem = ({
  categories,
  contentTypes,
  activeFilters,
  onFilterChange,
  onClearFilters,
  resultCount,
  totalCount,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const hasActiveFilters =
    activeFilters.categories.length > 0 || activeFilters.types.length > 0;

  return (
    <div className="mb-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full bg-white border-2 border-[#000000] border-opacity-20 rounded-lg p-4 flex justify-between items-center font-semibold text-[#000000] hover:border-[#4379D0] transition-colors duration-200"
        >
          <span>
            Filters{" "}
            {hasActiveFilters &&
              `(${
                activeFilters.categories.length + activeFilters.types.length
              })`}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isFiltersOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filters Container */}
      <div
        className={`
        ${isFiltersOpen ? "block" : "hidden"} 
        lg:block bg-white rounded-2xl border-2 border-[#000000] border-opacity-10 p-6
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#000000]">Filters</h3>
            <p className="text-sm text-[#000000] opacity-70">
              Showing {resultCount} of {totalCount} insights
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-[#4379D0] text-sm font-semibold hover:text-[#3a6abb] transition-colors duration-200"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Filters */}
          <div>
            <h4 className="font-semibold text-[#000000] mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.categories.includes(category.id)}
                    onChange={() => onFilterChange("categories", category.id)}
                    className="w-4 h-4 text-[#4379D0] bg-white border-2 border-[#000000] border-opacity-30 rounded focus:ring-[#4379D0] focus:ring-2"
                  />
                  <span className="text-[#000000] group-hover:text-[#4379D0] transition-colors duration-200">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Content Type Filters */}
          <div>
            <h4 className="font-semibold text-[#000000] mb-3">Content Type</h4>
            <div className="space-y-2">
              {contentTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.types.includes(type)}
                    onChange={() => onFilterChange("types", type)}
                    className="w-4 h-4 text-[#4379D0] bg-white border-2 border-[#000000] border-opacity-30 rounded focus:ring-[#4379D0] focus:ring-2"
                  />
                  <span className="text-[#000000] group-hover:text-[#4379D0] transition-colors duration-200">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="mt-6 pt-6 border-t border-[#000000] border-opacity-10">
            <h4 className="font-semibold text-[#000000] mb-3">
              Active Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeFilters.categories.map((categoryId) => {
                const category = categories.find(
                  (cat) => cat.id === categoryId
                );
                return (
                  <span
                    key={categoryId}
                    className="inline-flex items-center px-3 py-1 bg-[#4379D0] bg-opacity-10 text-[#fff] rounded-full text-sm"
                  >
                    {category?.name}
                    <button
                      onClick={() => onFilterChange("categories", categoryId)}
                      className="ml-2 text-[#4379D0] hover:text-[#3a6abb]"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
              {activeFilters.types.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-3 py-1 bg-[#000000] bg-opacity-10 text-[#fff] rounded-full text-sm"
                >
                  {type}
                  <button
                    onClick={() => onFilterChange("types", type)}
                    className="ml-2 text-[#000000] hover:text-opacity-70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sort Options (for future implementation) */}
        <div className="mt-6 pt-6 border-t border-[#000000] border-opacity-10">
          <h4 className="font-semibold text-[#000000] mb-3">Sort By</h4>
          <select className="w-full bg-white border-2 border-[#000000] border-opacity-20 rounded-lg p-3 text-[#000000] focus:border-[#4379D0] focus:outline-none transition-colors duration-200">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="relevance">Relevance</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSystem;
