import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartCampaign = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/start-project");
    } else {
      navigate("/login");
    }
  };

  return (
    <motion.div 
      className="px-6 md:px-20 py-16"
      initial={{ opacity: 0, y: 50 }} // Starts below and invisible
      animate={{ opacity: 1, y: 0 }} // Smoothly moves up and fades in
      transition={{ duration: 1, ease: "easeOut" }} // Controls animation timing
    >
      <section className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 overflow-hidden mt-20">
        
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/HeroSection.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content Box with Animation */}
        <motion.div 
          className="relative z-10 text-center text-white px-4 md:px-8"
          initial={{ opacity: 0, y: 50 }} // Starts slightly lower
          animate={{ opacity: 1, y: 0 }} // Moves up into place
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} // Slight delay for smooth effect
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bring Your Ideas to Life
          </h1>

          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            Join thousands of creators and start your crowdfunding campaign today. 
            Turn your vision into reality with the support of a global community.
          </p>

          {/* Animated Button */}
          <motion.button 
            onClick={handleStartCampaign}
            className="bg-orange-500 hover:bg-orange-600 shadow-lg px-8 py-4 rounded-lg text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.1 }} // Slight hover effect
            whileTap={{ scale: 0.95 }} // Button press effect
            initial={{ opacity: 0, y: 20 }} // Button appears slightly below
            animate={{ opacity: 1, y: 0 }} // Moves up into place
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }} // Delayed for better flow
          >
            Start a Campaign
          </motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HeroSection;
