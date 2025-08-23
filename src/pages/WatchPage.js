import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const WatchPage = ({ user, darkMode, toggleDarkMode }) => {
  const { contentId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError('');

      try {
        console.log(`Fetching video with ID: ${contentId}`);

        const res = await axios.get(`/videos/${contentId}`);

        console.log('Video API response:', res.data);

        if (res.data?.success && res.data?.data) {
          setVideo(res.data.data); // ✅ actual video object
        } else {
          setError(res.data?.message || 'Video not found.');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(err.response?.data?.message || 'Failed to load video.');
      } finally {
        setLoading(false);
      }
    };

    if (contentId) fetchVideo();
  }, [contentId]);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="pt-16 p-6">
        {loading && <p className="text-lg">Loading video...</p>}

        {error && !loading && (
          <p className="text-red-500 text-lg">{error}</p>
        )}

        {video && !loading && (
          <>
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>

            <div className="bg-gray-800 w-full aspect-video mb-4 rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={video.videoUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {video.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
