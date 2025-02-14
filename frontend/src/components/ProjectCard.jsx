import { useNavigate } from "react-router-dom";
import { FaUsers, FaClock, FaTag } from "react-icons/fa";

const ProjectCard = ({ project, isCompact = false }) => {
  const navigate = useNavigate();

  if (!project) {
    return <p>Loading...</p>;
  }

  const handleInvestClick = () => {
    navigate("/payment", { state: { project } });
  };

  const progressWidth = Math.min((project.raised / project.target) * 100, 100);

  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 w-full sm:max-w-sm md:max-w-md min-h-[400px] sm:min-h-[450px] ${isCompact ? "compact" : ""}`}>
      <div className="flex flex-col items-center">
        <img 
          src={project.image || "https://via.placeholder.com/150"} 
          alt={project.name} 
          className="w-full h-40 sm:h-52 object-cover rounded-lg" 
        />
        <div className="mt-2 flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
          <FaTag className="text-gray-500" />
          <span>{project.category}</span>
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-semibold mt-2">{project.name}</h3>
      {!isCompact && <p className="text-gray-600 mt-2 text-xs sm:text-sm">{project.description}</p>}

      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mt-3">
        <div
          className="bg-blue-500 h-2 sm:h-3 rounded-full"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="text-xs sm:text-sm text-gray-700 mt-1">Raised: ₹{project.raised.toLocaleString()} / ₹{project.target.toLocaleString()}</p>

      <div className="flex justify-between text-gray-700 mt-3 text-xs sm:text-sm">
        <span className="flex items-center gap-1">
          <FaUsers className="text-blue-500" /> {project.investors} investors
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-blue-500" /> {project.daysLeft} days left
        </span>
      </div>

      {!isCompact && (
        <button 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full text-xs sm:text-sm"
          onClick={handleInvestClick}
        >
          Fund Now
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
