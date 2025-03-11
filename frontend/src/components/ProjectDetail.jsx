import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/projects/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project details");

        const data = await response.json();
        setProject(data);

        // Fetch related projects based on category
        const relatedResponse = await fetch(
          `http://localhost:5001/api/projects?category=${data.category}`
        );
        if (!relatedResponse.ok) throw new Error("Failed to fetch related projects");

        const relatedData = await relatedResponse.json();
        setRelatedProjects(relatedData.filter((p) => p._id !== id)); // Exclude current project
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading project details...</div>;
  }

  if (!project) {
    return <div className="text-center py-10">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 md:px-20 py-10 mt-20">
      {/* Project Details */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={`http://localhost:5001${project.image}`}
          alt={project.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-6 text-gray-900">{project.name}</h1>
        
        {/* Category */}
        <div className="mt-4 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {project.category}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">About This Project</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Progress and Stats */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-sm">Raised</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{project.raised.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                of ₹{project.target.toLocaleString()} goal
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Investors</p>
              <p className="text-2xl font-bold text-gray-900">{project.investors}</p>
              <p className="text-sm text-gray-500">total backers</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Days Left</p>
              <p className="text-2xl font-bold text-gray-900">{project.daysLeft}</p>
              <p className="text-sm text-gray-500">to go</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((project.raised / project.target) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600 text-right">
              {Math.round((project.raised / project.target) * 100)}% funded
            </p>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject._id} project={relatedProject} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
