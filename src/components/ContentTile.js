import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContentTile = ({ content, onCreateWatchParty, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleWatchAlone = () => {
    navigate(`/watch/${content.id}`);
  };

  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden shadow-lg"
      style={{ height: '220px', width: '320px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
    >
      <img 
        src={content.posterUrl} 
        alt={content.title} 
        className="w-full h-full object-cover"
      />
      
      {isHovered && (
        <motion.div 
          className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-90 p-4 flex flex-col justify-between`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{content.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{content.genre}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{content.language}</p>
            
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {(Math.random() * 2 + 3).toFixed(1)}/5
              </span>
              <span className="mx-2">•</span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {Math.floor(Math.random() * 3 + 2018)}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <motion.button 
              onClick={handleWatchAlone}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm flex-1 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Alone
            </motion.button>
            <motion.button 
              onClick={() => onCreateWatchParty(content)}
              className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white px-3 py-2 rounded text-sm flex-1 transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Watch Party
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContentTile;