import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-12 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="text-blue-600 font-bold text-2xl flex items-center">
              <span className="mr-2">🎬</span>
              StreamSync
            </Link>
            <p className="mt-4 max-w-xs">
              Watch movies and TV shows together with friends and family, no matter where they are.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-600 transition-colors">
                <span>📱</span>
              </a>
              <a href="#" className="text-2xl hover:text-blue-600 transition-colors">
                <span>💻</span>
              </a>
              <a href="#" className="text-2xl hover:text-blue-600 transition-colors">
                <span>📺</span>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Press</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                <li><Link to="#" className="hover:text-blue-600 transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} StreamSync. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className={`py-1 px-2 rounded ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border`}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;