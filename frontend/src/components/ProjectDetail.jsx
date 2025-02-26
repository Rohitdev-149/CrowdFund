import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUsers, FaClock, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5001";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((error) => console.error("Error fetching project:", error));
  }, [id]);

  if (!project) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <img
        src={project.image ? `${BASE_URL}${project.image}` : "/images/fallback-image.png"}
        alt={project.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{project.name}</h1>
      <div className="mt-2 flex items-center gap-2 text-gray-600 text-sm">
        <FaTag className="text-gray-500" /> <span>{project.category}</span>
      </div>
      <p className="text-gray-700 mt-3">{project.description}</p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <motion.div
          className="bg-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(project.raised / project.target) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="text-gray-700 mt-2">
        Raised: ₹{project.raised?.toLocaleString()} / ₹{project.target?.toLocaleString()}
      </p>

      <div className="flex justify-between text-gray-700 mt-3">
        <span className="flex items-center gap-1">
          <FaUsers className="text-blue-500" /> {project.investors} investors
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-blue-500" /> {project.daysLeft} days left
        </span>
      </div>
    </div>
  );
};

export default ProjectDetail;
