import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axios';

const WatchPage = ({ user, darkMode, toggleDarkMode }) => {
  const { contentId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/${contentId}`);
        setVideo(res.data);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Video not found or failed to load.');
      }
    };

    fetchVideo();
  }, [contentId]);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Navbar user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="pt-16 p-6">
        {error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : video ? (
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
            <p className="text-gray-300">{video.description}</p>
          </>
        ) : (
          <p className="text-lg">Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
