import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserData(token);
    }
  }, [location.pathname]);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5001/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-300 fixed top-0 left-0 w-full h-20 flex items-center justify-between px-7 py-4 text-gray-800 text-xl shadow-md z-50"
    >
      {/* Left: Brand Name */}
      <div className="flex-none">
        <Link to="/" className="text-2xl font-bold hover:scale-105 transition-transform">
          CrowdFund
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
        <ul className="flex justify-center gap-8 text-lg">
          <li>
            <Link to="/" className="hover:text-blue-500 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-blue-500 transition-colors duration-200">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-500 transition-colors duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-500 transition-colors duration-200">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right: Authentication Buttons or Campaign & Profile */}
      <div className="flex-none hidden md:flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            {/* Start a Campaign Button */}
            <Link to="/start-project" className="bg-blue-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
              Start a Campaign
            </Link>

            {/* Profile Picture */}
            <Link to="/profile">
              <img
                src={userData?.profileImage ? `http://localhost:5001${userData.profileImage}` : "/default-profile.jpg"}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-400 object-cover"
              />
            </Link>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="bg-blue-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition-all duration-200">
              Login
            </Link>
            <Link to="/signup" className="bg-gray-700 px-6 py-3 rounded-md text-white hover:bg-gray-800 transition-all duration-200">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMenu} aria-label="Toggle Menu">
        {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Mobile Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-full bg-gray-100 shadow-lg transform ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } transition-all duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col h-full items-center justify-center gap-6 text-center relative">
          {/* Back Button */}
          <button
            className="absolute top-5 left-5 flex items-center text-gray-800 hover:text-blue-500"
            onClick={() => {
              toggleMenu();
              navigate("/");
            }}
          >
            <FiArrowLeft size={24} className="mr-2" /> Go Back
          </button>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 text-xl">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors duration-200" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-blue-500 transition-colors duration-200" onClick={toggleMenu}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500 transition-colors duration-200" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500 transition-colors duration-200" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Authentication Section */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              {/* Start a Campaign Button */}
              <Link 
                to="/start-project" 
                className="bg-blue-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                onClick={toggleMenu}
              >
                Start a Campaign
              </Link>

              {/* My Profile Button */}
              <Link
                to="/profile"
                className="bg-gray-300 px-6 py-3 rounded-md text-gray-800 hover:bg-gray-400 transition-all duration-200 transform hover:scale-105"
                onClick={toggleMenu}
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-64">
              <Link 
                to="/login" 
                className="bg-blue-600 px-6 py-3 rounded-md text-white hover:bg-blue-700 transition-all duration-200 text-center"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-gray-700 px-6 py-3 rounded-md text-white hover:bg-gray-800 transition-all duration-200 text-center"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Nav;
