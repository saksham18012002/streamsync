import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = ({ isLoggedIn, setShowSignupModal, handleLearnMore, darkMode }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isLoggedIn) {
      // Navigate to browse page instead of directly to watch
      navigate('/browse');
    } else {
      setShowSignupModal(true);
    }
  };

  return (
    <div className="relative pt-16 overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/70' : 'bg-gradient-to-t from-white via-white/90 to-white/70'}`}></div>
      </motion.div>
      
      <div className="relative z-10 container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Watch Together, <span className="text-blue-600 inline-block">Anywhere</span>
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Enjoy synchronized viewing with friends and family, no matter where they are. 
            Share reactions, chat, and create memories together.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg transition-all hover:shadow-xl flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoggedIn ? (
                <>
                  <span>Watch Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Get Started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </motion.button>
            
            <motion.button 
              onClick={handleLearnMore}
              className={`${darkMode ? 'bg-transparent border-2 border-white hover:bg-white hover:text-gray-900' : 'bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white'} text-lg font-medium px-10 py-4 rounded-full shadow-lg transition-all hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>10,000+ Movies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📺</div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>5,000+ TV Shows</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👥</div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Unlimited Watch Parties</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className={`${darkMode ? 'fill-gray-900' : 'fill-gray-100'} w-full h-[60px]`}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;