import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillGithub, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About Us</h3>
          <p className="text-sm">
            We are dedicated to helping creators fund their projects through
            community support. Our platform connects passionate backers with
            innovative ideas, making dreams a reality.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <AiFillFacebook />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <AiFillGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <AiFillTwitterCircle />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-3xl">
              <AiFillInstagram />
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@crowdfunding.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm">
        <p>&copy; 2025 Crowdfunding. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
