import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillGithub, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-gray-300 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            We help creators fund their projects through community support, 
            connecting passionate backers with innovative ideas.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["About", "Projects", "FAQ", "Contact"].map((link) => (
              <li key={link}>
                <Link to={`/${link.toLowerCase()}`} className="hover:text-orange-400 transition duration-300">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { href: "https://facebook.com", icon: <AiFillFacebook /> },
              { href: "https://github.com", icon: <AiFillGithub /> },
              { href: "https://twitter.com", icon: <AiFillTwitterCircle /> },
              { href: "https://instagram.com", icon: <AiFillInstagram /> },
            ].map(({ href, icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 text-3xl transition-all duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@crowdfunding.com</p>
          <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center border-t border-gray-700 mt-10 pt-4 text-sm text-gray-400">
        <p>&copy; 2025 Crowdfunding. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
