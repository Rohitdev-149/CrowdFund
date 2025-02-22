import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion"; // Import Framer Motion

function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Triggers animation once when in view

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
    <motion.div 
      ref={ref}
      className="p-7 sm:p-10 md:p-20"
      initial={{ opacity: 0, y: 50 }} // Start hidden and below
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only when in view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 className="text-2xl sm:text-2xl font-semibold underline underline-offset-8 text-black mb-6">
        Featured Projects
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading projects...</p>
      ) : projects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 }, // Stagger animation for cards
            },
          }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project._id} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">No projects available</p>
      )}

      <motion.div 
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <motion.button 
          className="bg-orange-500 hover:bg-orange-600 shadow-lg px-8 py-4 rounded-lg text-lg md:text-xl text-white font-semibold transition-all duration-300 hover:scale-105"
          onClick={() => navigate("/projects")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ProjectSection;
