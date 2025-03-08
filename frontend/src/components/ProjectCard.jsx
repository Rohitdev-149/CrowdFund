import { useNavigate } from "react-router-dom";
import { FaUsers, FaClock, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';
import axios from 'axios';

const BASE_URL = "http://localhost:5001"; // Backend URL to access images

const ProjectCard = ({ project, isCompact = false }) => {
  const navigate = useNavigate();

  if (!project) {
    return <p>Loading...</p>;
  }

  // const handleCardClick = () => {
  //   navigate(`/project-details/${project._id}`);
  // };

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5001/create-order", {
        amount: 100, // Amount in INR
      });
  
      const { order } = response.data;
  
      const options = {
        amount: order.amount,
        currency: order.currency,
        name: project.name,
        description: `Support the project: ${project.name}`,
        order_id: order.id,
        handler: async function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
  
          // Backend ko inform karo ki funds update ho gaye
          await axios.post("http://localhost:5001/update-funds", {
            projectId: project._id,
            amount: order.amount / 100, // Convert paisa to INR
          });
  
          // UI update ke liye project data ko refresh karo
          project.raised += order.amount / 100;
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  
  const progressWidth = project.target && project.raised
    ? Math.min((Number(project.raised) / Number(project.target)) * 100, 100)
    : 0;

  const imageUrl = project.image
    ? `${BASE_URL}${project.image}` 
    : "/images/fallback-image.png";

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-200 shadow-lg rounded-lg p-4 w-full sm:max-w-sm md:max-w-md min-h-[400px] sm:min-h-[450px] cursor-pointer"
      // onClick={handleCardClick} // Navigate to project details on click
      // onClick={handleCardClick} // Navigate to project details on click
    >
      <div className="flex flex-col items-center">
        <img
          src={imageUrl}
          alt={project.name}
          className="w-full h-40 sm:h-52 object-cover rounded-lg"
          onError={(e) => (e.target.src = "/images/fallback-image.png")}
        />
        <div className="mt-2 flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
          <FaTag className="text-gray-500" />
          <span>{project.category}</span>
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-semibold mt-2">{project.name}</h3>
      {!isCompact && (
        <p className="text-gray-600 mt-2 text-xs sm:text-sm">{project.description}</p>
      )}

      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mt-3">
        <motion.div
          className="bg-blue-500 h-2 sm:h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
      <div className="text-xs sm:text-sm text-gray-700 mt-1">
        <p>
          Raised: ₹{project.raised ? Number(project.raised).toLocaleString('en-IN') : "0"} / ₹
          {project.target ? Number(project.target).toLocaleString('en-IN') : "N/A"}
        </p>
        <p className="text-blue-500 font-medium">
          {progressWidth.toFixed(1)}% funded
        </p>
      </div>

      <div className="flex justify-between text-gray-700 mt-3 text-xs sm:text-sm">
        <span className="flex items-center gap-1">
          <FaUsers className="text-blue-500" /> {project.investors} investors
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-blue-500" /> {project.daysLeft} days left
        </span>
      </div>

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handlePayment}
      >
        Fund Now
      </button>

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={handlePayment}
      >
        Fund Now
      </button>
    </motion.div>
  );
};

export default ProjectCard;