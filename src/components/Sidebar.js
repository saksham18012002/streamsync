import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WatchPartyModal = ({ content, onClose, onCreateParty, darkMode }) => {
  const [partyName, setPartyName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Generate a random party code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCode(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  const handleStartWatching = () => {
    onCreateParty({
      contentId: content.id,
      partyName: partyName || `${content.title} Party`,
      isPrivate,
      partyCode: generatedCode
    });
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-8 rounded-lg max-w-md w-full`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Watch Party</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {showCode ? (
          <div className="text-center py-6">
            <h3 className="text-xl font-bold mb-4">Your Party Code</h3>
            <div className={`text-3xl font-mono font-bold mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {generatedCode}
            </div>
            <p className="mb-6">Share this code with friends to invite them to your watch party.</p>
            <div className="flex space-x-3 justify-center">
              <motion.button
                onClick={handleCopyCode}
                className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded transition-colors flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copySuccess ? (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                    Copy Code
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={handleStartWatching}
                className={`px-4 py-2 ${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition-colors flex items-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Start Watching
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex mb-6">
              <img 
                src={content.posterUrl} 
                alt={content.title} 
                className="w-24 h-36 object-cover rounded-lg mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">{content.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{content.genre}</p>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{content.language}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 mr-1">⭐</span>
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {(Math.random() * 2 + 3).toFixed(1)}/5
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Party Name</label>
                <input
                  type="text"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className={`w-full p-3 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder={`${content.title} Party`}
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="mr-2"
                  />
                  <span>Private Party (Invite Only)</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <motion.button
                  type="button"
                  onClick={onClose}
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
                  Generate Code
                </motion.button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default WatchPartyModal;