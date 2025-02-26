import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "./ProjectCard"; // Reuse ProjectCard component

const BASE_URL = "http://localhost:5001";

const SimilarProjects = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/projects/similar/${id}`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching similar projects:", error));
  }, [id]);

  if (projects.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No similar projects found.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Similar Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} isCompact={true} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProjects;
