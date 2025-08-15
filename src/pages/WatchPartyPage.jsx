import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const WatchPartyPage = ({ user, darkMode, toggleDarkMode }) => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      setError('');

      try {
        console.log(`Fetching watch party session with ID: ${sessionId}`);

        const res = await axios.get(
          `http://localhost:3000/api/sessions/${sessionId}`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Session data from backend:', res.data);

        if (res.data && res.data._id) {
          setSession(res.data);
        } else {
          setError(res.data?.message || 'Session not found.');
        }
      } catch (err) {
        console.error('Failed to load session:', err);
        setError(err.response?.data?.message || 'Failed to load watch party session.');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="pt-16 p-6">
        {loading && <p className="text-lg">Loading session...</p>}

        {error && !loading && (
          <p className="text-red-500 text-lg">{error}</p>
        )}

        {session && !loading && session.videoUrl ? (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Watch Party – {session.title || session.sessionId}
            </h1>

            <div className="bg-gray-800 w-full aspect-video mb-4 rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={session.videoUrl}
                title="Watch Party Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              You're watching with friends 🎉
            </p>
          </>
        ) : (
          !loading && <p className="text-lg">No video found for this session.</p>
        )}
      </div>
    </div>
  );
};

export default WatchPartyPage;
