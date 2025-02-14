import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const response = await fetch("/project.json");
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

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 md:px-20 py-25">
      {/* Top Section: Title & Start Campaign Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Explore Fundraising Projects
        </h2>

        {/* Show "Start a Campaign" button on the right if the user is NOT logged in */}
        {!isLoggedIn && (
          <Link
            to="/start-project"
            className="bg-blue-600 px-6 py-3 rounded-md text-white text-lg font-medium hover:bg-blue-700 transition"
          >
            Start a Campaign
          </Link>
        )}
      </div>

      {/* Project List */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg font-medium">Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg font-medium">
          No projects available.
        </p>
      )}

      {/* Bottom Section: Always Visible Start Campaign Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/start-project"
          className="bg-blue-600 px-8 py-4 rounded-md text-white text-lg font-medium hover:bg-blue-700 transition"
        >
          Start a Campaign
        </Link>
      </div>
    </div>
  );
}

export default Projects;
