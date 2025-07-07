import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = ({ isLoggedIn, setShowSignupModal, darkMode }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/browse');
    } else {
      setShowSignupModal(true);
    }
  };

  return (
    <div className={`py-20 ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Ready to watch together?
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>
            Join thousands of users who are already enjoying StreamSync's watch party experience.
          </p>
          <motion.button 
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <div className="flex items-center">
              <span className="text-3xl mr-2">⭐</span>
              <div className="text-left">
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>4.9/5 Rating</p>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>From 10,000+ reviews</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-3xl mr-2">👥</span>
              <div className="text-left">
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1M+ Users</p>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Worldwide community</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-3xl mr-2">🔒</span>
              <div className="text-left">
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>100% Secure</p>
                <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>End-to-end encryption</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;