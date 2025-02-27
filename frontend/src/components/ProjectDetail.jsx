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
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 md:px-20 py-10">
      {/* Project Details */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <img
          src={`http://localhost:5001${project.image}`}
          alt={project.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{project.name}</h1>
        <p className="text-gray-700 mt-2">{project.description}</p>
        <p className="mt-4 text-lg font-semibold">
          Raised: ₹{project.raised.toLocaleString()} / ₹{project.target.toLocaleString()}
        </p>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Related Projects</h2>
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
