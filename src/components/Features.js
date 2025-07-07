import React from 'react';
import { motion } from 'framer-motion';

const Features = ({ darkMode }) => {
  const features = [
    {
      title: "Synchronized Playback",
      description: "Watch content in perfect sync with friends, no matter where they are.",
      icon: "🔄"
    },
    {
      title: "Live Chat",
      description: "Chat with your friends while watching without missing a moment.",
      icon: "💬"
    },
    {
      title: "High Quality Streaming",
      description: "Enjoy your favorite content in HD and 4K quality.",
      icon: "✨"
    },
    {
      title: "Cross-Platform",
      description: "Available on web, mobile, and smart TVs for seamless viewing.",
      icon: "📱"
    },
    {
      title: "Private Watch Parties",
      description: "Create invite-only watch parties for a more intimate experience.",
      icon: "🔒"
    },
    {
      title: "Custom Profiles",
      description: "Create and customize your profile to express yourself.",
      icon: "👤"
    }
  ];

  return (
    <div className={`py-20 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Amazing Features</h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            StreamSync is packed with features to enhance your viewing experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-all`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;