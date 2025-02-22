import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="p-10 sm:p-16 md:p-20 bg-gray-100 text-gray-900 flex flex-col md:flex-row md:justify-between items-center space-y-12 md:space-y-0 md:space-x-10"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Our Mission Section */}
      <motion.div
        className="text-center max-w-md flex flex-col items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <motion.img
          src="/mission.png"
          alt="Our Mission"
          className="w-48 h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
        />
        <p className="text-base sm:text-lg text-gray-600">
          Our mission is to empower innovators and visionaries by providing a seamless crowdfunding platform.
        </p>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        className="text-center max-w-md flex flex-col items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <motion.img
          src="/mission2.png"
          alt="Why Choose Us"
          className="w-48 h-48 object-contain rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
        />
        <p className="text-base sm:text-lg text-gray-600">
          We offer a user-friendly, secure, and transparent platform that makes fundraising effortless.
        </p>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        className="text-center max-w-md flex flex-col items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
          How It Works
        </h2>
        <motion.img
          src="/mission3.png"
          alt="How It Works"
          className="w-48 h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
        />
        <p className="text-base sm:text-lg text-gray-600">
          Creating a campaign is easy! Sign up, share your story, and connect with backers to bring your idea to life.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default AboutSection;
