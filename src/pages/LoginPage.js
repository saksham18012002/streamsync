import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/browse'); // Redirect to content page if already logged in
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would make an API call to authenticate the user
    if (email && password) {
      // Simulate successful login
      localStorage.setItem('authToken', 'sample-token');
      navigate('/browse');
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="pt-24 px-4">
        <div className="max-w-md mx-auto bg-black bg-opacity-80 p-8 rounded">
          <h1 className="text-3xl font-bold mb-6 text-white">Sign In</h1>
          
          {error && (
            <div className="bg-red-900 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Email or phone number"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded text-white font-medium"
            >
              Sign In
            </button>

            <div className="flex justify-between items-center mt-4 text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>

            <div className="mt-16">
              <p className="text-gray-400">
                New to StreamSync? <a href="#" className="text-white hover:underline">Sign up now</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;