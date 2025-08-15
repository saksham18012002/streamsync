import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginModal = ({ setShowLoginModal, setShowSignupModal, handleLogin, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleLogin({ email, name: 'User' }); // In a real app, name would come from the backend
    } else {
      setError('Please enter both email and password');
    }
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
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
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
          <button 
            onClick={() => setShowLoginModal(false)} 
            className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <motion.div 
            className="bg-red-500 text-white p-3 rounded mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>

          <div className="mt-6 text-center">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={switchToSignup} 
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up now
              </button>
            </p>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
