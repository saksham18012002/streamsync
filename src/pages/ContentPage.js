import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const ContentPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos");
        console.log("Fetched videos:", response.data);
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Available Videos</h1>

      {loading && <p className="text-center">Loading videos...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && videos.length === 0 && (
        <p className="text-center text-gray-500">No videos available yet. Please check back later.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
