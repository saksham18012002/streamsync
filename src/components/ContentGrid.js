import React from 'react';
import ContentTile from './ContentTile';
import { motion } from 'framer-motion';

const ContentGrid = ({ title, contents, onCreateWatchParty, darkMode }) => {
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <motion.h2 
        className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <div className="flex space-x-6 overflow-x-auto pb-6 hide-scrollbar">
        {contents.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ContentTile 
              content={content} 
              onCreateWatchParty={onCreateWatchParty}
              darkMode={darkMode}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;