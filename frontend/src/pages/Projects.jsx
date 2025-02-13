import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 md:px-20 py-35">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
        Explore Fundraising Projects
      </h2>

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
    </div>
  );
}

export default Projects;
