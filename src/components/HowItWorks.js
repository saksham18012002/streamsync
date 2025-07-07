import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = ({ darkMode }) => {
  const steps = [
    {
      icon: "🎬",
      title: "Choose What to Watch",
      description: "Browse our extensive library of movies and TV shows."
    },
    {
      icon: "👥",
      title: "Invite Friends",
      description: "Create a watch party and invite friends with a simple code."
    },
    {
      icon: "🍿",
      title: "Watch Together",
      description: "Enjoy synchronized playback and chat while watching."
    }
  ];

  return (
    <div id="how-it-works" className={`py-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            StreamSync makes it easy to watch content with friends and family, no matter where they are.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;