import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiArrowLeft } from "react-icons/fi";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-300 fixed top-0 left-0 w-full h-20 flex px-7 py-4 items-center justify-between text-gray-800 text-xl shadow-md z-50">
      {/* Left Side: Brand Name */}
      <div className="nav-left">
        <Link to="/" className="text-2xl font-bold">CrowdFund</Link>
      </div>

      {/* Menu Button (Mobile) */}
      <button
        className="md:hidden text-gray-800 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex gap-6">
        <ul className="flex gap-6 text-xl">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/projects" className="hover:text-blue-500">Projects</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>
      </nav>

      {/* Login & Signup  */}
      <div className="hidden md:flex gap-4">
        <Link to="/login" className="bg-blue-500 px-6 py-3 rounded-md text-white hover:bg-blue-600">
          Login
        </Link>
        <Link to="/signup" className="bg-green-500 px-6 py-3 rounded-md text-white hover:bg-green-600">
          Sign Up
        </Link>
      </div>

      {/* Mobile Sidebar (Sliding from Left) */}
      <nav
        className={`fixed top-0 left-0 h-screen w-full bg-gray-100 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex flex-col h-full items-center justify-center gap-6 text-center relative">
          {/* Back Button (Only for Mobile) */}
          <button
            className="absolute top-5 left-5 flex items-center text-gray-800 hover:text-blue-500"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            <FiArrowLeft size={24} className="mr-2" /> Go Back
          </button>

          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-6 text-xl">
            <li><Link to="/" className="hover:text-blue-500" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/projects" className="hover:text-blue-500" onClick={closeMenu}>Projects</Link></li>
            <li><Link to="/about" className="hover:text-blue-500" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500" onClick={closeMenu}>Contact</Link></li>
          </ul>

          {/* Login & Signup (Mobile) */}
          <div className="flex gap-4">
            <Link to="/login" className="bg-blue-500 px-6 py-3 rounded-md text-white hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-6 py-3 rounded-md text-white hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
