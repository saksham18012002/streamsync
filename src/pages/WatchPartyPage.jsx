import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const WatchPartyPage = ({ user, darkMode, toggleDarkMode }) => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`/api/sessions/${sessionId}`);
        setSession(res.data);
      } catch (err) {
        setError('Watch party session not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar />
      <div className="pt-16 p-6">
        {loading ? (
          <p className="text-lg">Loading session...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : session && session.videoUrl ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Watch Party - {session.sessionId}</h1>
            <div className="bg-gray-800 w-full aspect-video mb-4 rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={session.videoUrl}
                title="Watch Party Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-gray-300">You're watching with friends 🎉</p>
          </>
        ) : (
          <p className="text-lg">No video found for this session.</p>
        )}
      </div>
    </div>
  );
};

export default WatchPartyPage;
