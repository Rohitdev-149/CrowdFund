import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { useRefresh } from "../context/RefreshContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { refreshProjects } = useRefresh();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        setLoading(true);
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
  }, [refreshProjects]); // Add refreshProjects to dependency array

  // Handle Start Campaign Button Click
  const handleStartCampaign = () => {
    if (isLoggedIn) {
      navigate("/start-project");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Projects</h1>
        <button
          onClick={handleStartCampaign}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start a Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
