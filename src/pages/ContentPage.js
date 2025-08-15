import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const ContentPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("Fetching videos from backend...");

        const res = await axios.get(
          "http://localhost:3000/api/videos",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Fetched videos:", res.data);

        // If backend sends message instead of array
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos(res.data);
        } else {
          setVideos([]);
          setError(res.data?.message || "No videos available at the moment.");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(err.response?.data?.message || "Failed to load videos. Please try again.");
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

      {error && !loading && <p className="text-center text-red-500">{error}</p>}

      {!loading && videos.length === 0 && !error && (
        <p className="text-center text-gray-500">No videos available yet. Please check back later.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
