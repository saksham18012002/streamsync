import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

const WatchPartyPage = ({ user, darkMode, toggleDarkMode }) => {
  const { partyCode } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      setError("");

      try {
        console.log(`Fetching session with code: ${partyCode}`);

        const res = await axios.get(`/sessions/${partyCode}`);

        console.log("Session API response:", res.data);

        if (res.data?.success && res.data?.data) {
          setSession(res.data.data); // ✅ actual session object
        } else {
          setError(res.data?.message || "Session not found.");
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setError(err.response?.data?.message || "Failed to load session.");
      } finally {
        setLoading(false);
      }
    };

    if (partyCode) fetchSession();
  }, [partyCode]);

  return (
    <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      <Navbar user={user} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="pt-16 p-6">
        {loading && <p className="text-lg">Loading watch party...</p>}

        {error && !loading && (
          <p className="text-red-500 text-lg">{error}</p>
        )}

        {session && !loading && (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Watch Party: {session.partyCode}
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

            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Host: {session.host?.name || "Unknown"}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Participants: {session.participants?.length || 0}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchPartyPage;
