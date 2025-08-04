import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/users/register', { email, password });

      if (response.status === 201) {
        const { token, user } = response.data;

        // Save token and user to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        setMessage('✅ Signup successful!');
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded w-full max-w-sm shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded font-semibold"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;

