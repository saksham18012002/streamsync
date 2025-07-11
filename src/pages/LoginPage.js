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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        // Simulated login with dummy API response
        // Replace this with your real API:
        // const res = await fetch('http://localhost:5000/api/users/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }),
        // });

        // const data = await res.json();
        // if (res.ok) {
        //   localStorage.setItem('authToken', data.token);
        //   navigate('/browse');
        // } else {
        //   setError(data.message || 'Login failed');
        // }

        // Dummy successful login
        localStorage.setItem('authToken', 'sample-token');
        navigate('/browse');
      } catch (err) {
        setError('Something went wrong during login');
      }
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

            <div className="flex justify-between items-center mt-4 text-gray-400 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert('Support coming soon!')}
                className="hover:underline"
              >
                Need help?
              </button>
            </div>

            <div className="mt-16 text-sm text-gray-400">
              <p>
                New to StreamSync?{' '}
                <span className="text-white hover:underline cursor-pointer">
                  Sign up now
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
