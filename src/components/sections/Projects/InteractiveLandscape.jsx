// sections/Projects/InteractiveLandscape.jsx
import React, { useState, useEffect, useRef } from "react";
import Section from "../../ui/Section";
import projectsData from "../../../assets/data/projects.json";

// Import Leaflet CSS and JS
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const InteractiveLandscape = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [view, setView] = useState("map");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const { featured, otherProjects } = projectsData;

  // Real coordinates for Wanja Kerssa, Ethiopia (approximate)
  const projectLocations = [
    {
      id: "coffee-waste-management",
      name: "Coffee Waste Management",
      lat: 7.6769,
      lng: 36.8357,
      status: "active",
      type: "featured",
    },
    {
      id: "pacsmac",
      name: "PACSMAC",
      lat: 7.68,
      lng: 36.83,
      status: "active",
      type: "research",
    },
    {
      id: "abcdrybasin",
      name: "ABCDryBASIN",
      lat: 7.673,
      lng: 36.84,
      status: "active",
      type: "resilience",
    },
    {
      id: "transform",
      name: "TRANSFORM",
      lat: 7.6785,
      lng: 36.8325,
      status: "active",
      type: "soil",
    },
  ];

  useEffect(() => {
    if (view === "map" && mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      const map = L.map(mapRef.current).setView([7.6769, 36.8357], 14);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Create custom icons for different project types
      const createCustomIcon = (color) => {
        return L.divIcon({
          html: `
            <div style="
              background-color: ${color};
              width: 20px;
              height: 20px;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          `,
          className: "custom-marker",
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
      };

      const iconColors = {
        featured: "#4379D0",
        research: "#000000",
        resilience: "#3a6abb",
        soil: "#2a4a8a",
      };

      // Add markers to map
      projectLocations.forEach((location) => {
        const marker = L.marker([location.lat, location.lng], {
          icon: createCustomIcon(iconColors[location.type]),
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${location.name}</h3>
            <p class="text-sm text-gray-600">${
              getProjectById(location.id)?.tagline || ""
            }</p>
            <button 
              onclick="window.dispatchEvent(new CustomEvent('projectClick', { detail: '${
                location.id
              }' }))"
              class="mt-2 px-3 py-1 bg-[#4379D0] text-white text-sm rounded hover:bg-[#3a6abb] transition-colors"
            >
              View Details
            </button>
          </div>
        `);

        marker.on("click", () => {
          setActiveProject(location.id);
        });

        markersRef.current.push(marker);
      });

      // Handle custom events from popup
      const handleProjectClick = (event) => {
        setActiveProject(event.detail);
      };

      window.addEventListener("projectClick", handleProjectClick);

      mapInstanceRef.current = map;

      return () => {
        window.removeEventListener("projectClick", handleProjectClick);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [view]);

  const getProjectColor = (projectType) => {
    const colors = {
      featured: "#4379D0",
      research: "#000000",
      resilience: "#3a6abb",
      soil: "#2a4a8a",
    };
    return colors[projectType] || "#4379D0";
  };

  const getProjectById = (id) => {
    if (id === featured.id) return featured;
    return otherProjects.find((project) => project.id === id);
  };

  return (
    <Section id="projects" backgroundColor="white" padding="large">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-4">
            Our <span className="text-[#4379D0]">Projects</span>
          </h2>
          <p className="text-xl text-[#000000] opacity-80 max-w-3xl mx-auto mb-8">
            Exploring regenerative solutions across the Wanja Kerssa landscape
          </p>

          {/* View Toggle */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setView("map")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                view === "map"
                  ? "bg-[#4379D0] text-white"
                  : "bg-transparent text-[#000000] border-2 border-[#4379D0] hover:bg-[#4379D0] hover:text-white"
              }`}
            >
              Map View
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                view === "list"
                  ? "bg-[#4379D0] text-white"
                  : "bg-transparent text-[#000000] border-2 border-[#4379D0] hover:bg-[#4379D0] hover:text-white"
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {view === "map" ? (
          /* Interactive Leaflet Map */
          <div className="relative bg-gray-50 rounded-2xl border-2 border-[#000000] border-opacity-10 p-8">
            <div
              ref={mapRef}
              className="w-full h-96 rounded-xl overflow-hidden"
            />

            {/* Legend */}
            <div className="absolute bottom-70 left-6 bg-white rounded-lg shadow-lg p-4 border border-[#000000] border-opacity-10 z-[1000]">
              <h4 className="font-semibold text-[#000000] mb-2">
                Project Types
              </h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#4379D0]"></div>
                  <span className="text-sm text-[#000000]">
                    Featured Project
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#000000]"></div>
                  <span className="text-sm text-[#000000]">Research</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#3a6abb]"></div>
                  <span className="text-sm text-[#000000]">Resilience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#2a4a8a]"></div>
                  <span className="text-sm text-[#000000]">Soil Health</span>
                </div>
              </div>
            </div>

            {/* Active Project Info */}
            {activeProject && (
              <div className="mt-6 p-6 bg-white rounded-xl border-2 border-[#4379D0]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#000000]">
                    {getProjectById(activeProject)?.title}
                  </h3>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="text-[#000000] opacity-70 hover:opacity-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-[#000000] opacity-80 mb-4">
                  {getProjectById(activeProject)?.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {getProjectById(activeProject)?.partners?.map(
                    (partner, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#4379D0] bg-opacity-10 text-[#fff] text-sm rounded-full"
                      >
                        {partner}
                      </span>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById(`project-${activeProject}`)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-[#4379D0] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3a6abb] transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Project */}
            <div
              className="md:col-span-2 bg-gradient-to-r from-[#4379D0] to-[#3a6abb] rounded-2xl p-8 text-white"
              id={`project-${featured.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-white text-[#4379D0] px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                    Featured Project
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{featured.title}</h3>
                  <p className="text-white opacity-90">{featured.tagline}</p>
                </div>
                <span className="bg-white text-[#4379D0] bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {featured.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Challenges Addressed</h4>
                  <ul className="space-y-1 text-sm opacity-90">
                    {featured.challenges.slice(0, 3).map((challenge, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-white rounded-full mr-2"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Key Partners</h4>
                  <div className="flex flex-wrap gap-2">
                    {featured.partners.slice(0, 3).map((partner, index) => (
                      <span
                        key={index}
                        className="bg-white text-[#4379D0]  bg-opacity-20 px-2 py-1 rounded text-xs"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Projects */}
            {otherProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="bg-white rounded-2xl border-2 border-[#000000] border-opacity-10 p-6 hover:border-[#4379D0] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-[#000000]">
                    {project.title}
                  </h3>
                  <span className="bg-[#4379D0] bg-opacity-10 text-[#fff] px-2 py-1 rounded-full text-xs font-semibold">
                    {project.status}
                  </span>
                </div>
                <p className="text-[#000000] opacity-70 mb-4">
                  {project.focus}
                </p>
                <button
                  onClick={() => setActiveProject(project.id)}
                  className="text-[#4379D0] font-semibold hover:text-[#3a6abb] transition-colors duration-200"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default InteractiveLandscape;
