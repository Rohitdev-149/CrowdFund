import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";

function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
      
        const response = await fetch("http://localhost:5001/api/projects");  
        const data = await response.json();
        
        setProjects(data.slice(0, 3)); 
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-7 sm:p-10 md:p-20">
      <h2 className="text-2xl sm:text-2xl font-semibold underline underline-offset-8 text-black mb-6">
        Featured Projects
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Displaying projects */}
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No projects available</p>
      )}

      <div className=" mt-25 flex justify-center">
        <button 
          className="bg-orange-500 hover:bg-orange-600 shadow-lg px-8 py-4 rounded-lg text-lg md:text-xl text-white font-semibold transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/projects")}
        >
          View All Projects
        </button>
      </div>
    </div>
  );
}

export default ProjectSection;
