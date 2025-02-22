import React from "react";
import { motion } from "framer-motion";
import { AiFillFacebook, AiFillGithub, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-blue-600 text-center mb-6"
      >
        Contact Us
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-700 text-center mb-10"
      >
        Have questions? Reach out to us, and we'll be happy to assist you!
      </motion.p>

      {/* Contact Info & Form */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">📍 Our Office</h3>
          <p className="text-gray-700">123 FundConnect Street, Tech City, India</p>
          
          <h3 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">📞 Contact</h3>
          <p className="text-gray-700">Phone: <span className="font-semibold">+91 98765 43210</span></p>
          <p className="text-gray-700">Email: <span className="font-semibold">support@fundconnect.com</span></p>
          
          <h3 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">⏰ Working Hours</h3>
          <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-100 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">📧 Send Us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Social Media Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-10"
      >
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 text-3xl transition">
            <AiFillFacebook />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 text-3xl transition">
            <AiFillGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 text-3xl transition">
            <AiFillTwitterCircle />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-600 text-3xl transition">
            <AiFillInstagram />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
