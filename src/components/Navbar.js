import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ darkMode, toggleDarkMode, user, setShowLoginModal, onWatchNow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isJoinPartyModalOpen, setIsJoinPartyModalOpen] = useState(false);
  const [partyCode, setPartyCode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the content page
  const isContentPage = location.pathname === '/browse';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleJoinParty = () => {
    setIsJoinPartyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsJoinPartyModalOpen(false);
  };

  const handleSubmitPartyCode = (e) => {
    e.preventDefault();
    // Generate a random party code if empty
    const finalPartyCode = partyCode || Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/watch-party/${finalPartyCode}`);
    setIsJoinPartyModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const handleWatchNowClick = (e) => {
    e.preventDefault();
    if (onWatchNow) {
      onWatchNow();
    } else {
      navigate('/browse');
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 flex justify-between items-center transition-all duration-300 ${
        isScrolled 
          ? darkMode 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/95 backdrop-blur-md shadow-lg' 
          : darkMode 
            ? 'bg-transparent' 
            : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="flex items-center">
        <Link to="/" className="text-blue-600 font-bold text-2xl mr-10 flex items-center">
          <span className="mr-2">🎬</span>
          StreamSync
        </Link>
      </div>
      
      {/* Only show these navigation items on the content page */}
      {isContentPage && (
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/browse" className="hover:text-blue-600 transition-colors">Browse</Link>
          <button onClick={handleJoinParty} className="hover:text-blue-600 transition-colors">Join Party</button>
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <motion.button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.button>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2 shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                {user.name || 'User'}
              </span>
            </motion.div>
            {!isContentPage && (
              <motion.button 
                onClick={handleWatchNowClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Watch Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </motion.button>
            )}
            <motion.button 
              onClick={handleLogout}
              className="bg-transparent hover:bg-blue-100 text-blue-600 px-4 py-2 rounded border border-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={handleLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        )}
        
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={`absolute top-16 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} w-48 py-2 mt-2 rounded shadow-xl z-20`}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Home</Link>
            
            {/* Only show these menu items on the content page */}
            {isContentPage && (
              <>
                <Link to="/browse" className={`block px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Browse</Link>
                <button onClick={handleJoinParty} className={`block w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>Join Party</button>
              </>
            )}
            
            {user && (
              <>
                {!isContentPage && (
                  <button 
                    onClick={handleWatchNowClick} 
                    className={`block w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    Watch Now
                  </button>
                )}
                <button 
                  onClick={handleLogout} 
                  className={`block w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  Sign Out
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isJoinPartyModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg max-w-md w-full`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <h2 className="text-2xl font-bold mb-4">Join Watch Party</h2>
              <form onSubmit={handleSubmitPartyCode}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Enter Party Code</label>
                  <input
                    type="text"
                    value={partyCode}
                    onChange={(e) => setPartyCode(e.target.value)}
                    className={`w-full p-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border rounded`}
                    placeholder="Enter code or leave empty to generate"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={handleCloseModal}
                    className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;