import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WatchPage = () => {
  const { contentId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${contentId}`);
        const data = await res.json();
        if (res.ok) {
          setVideo(data);
        } else {
          setError(data.message || 'Failed to fetch video');
        }
      } catch (err) {
        setError('Error loading video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [contentId]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="pt-16 p-6">
        {loading ? (
          <p className="text-lg">Loading video...</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : video && video.videoUrl ? (
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
          <p className="text-lg">No video available for this content.</p>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
