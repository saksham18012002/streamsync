import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // ✅ Added phone
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // ✅ Client-side check before hitting backend
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Sending signup request...", { name, email, phone, password });

      const response = await axios.post(
        '/users/register', // ✅ use axios baseURL
        { name, email, phone, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log("Signup success:", response.data);
      setMessage(response.data?.message || '✅ Signup successful!');

      // ✅ Redirect after short delay
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-8 rounded w-full max-w-sm shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          required
        />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          required
        />

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
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
          required
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
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
