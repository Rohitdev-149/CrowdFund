import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle Start Campaign Button Click
  const handleStartCampaign = () => {
    if (isLoggedIn) {
      navigate("/start-project");
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 md:px-20 py-25">
      {/* Top Section: Title & Start Campaign Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Explore Fundraising Projects
        </h2>

        <button
          onClick={handleStartCampaign}
          className="bg-blue-600 px-6 py-3 rounded-md text-white text-lg font-medium hover:bg-blue-700 transition"
        >
          Start a Campaign
        </button>
      </div>

      {/* Project List */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg font-medium">Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg font-medium">
          No projects available.
        </p>
      )}

      {/* Bottom Section: Always Visible Start Campaign Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleStartCampaign}
          className="bg-blue-600 px-8 py-4 rounded-md text-white text-lg font-medium hover:bg-blue-700 transition"
        >
          Start a Campaign
        </button>
      </div>
    </div>
  );
}

export default Projects;
