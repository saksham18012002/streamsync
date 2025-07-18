import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ContentGrid from '../components/ContentGrid';
import WatchPartyModal from '../components/WatchPartyModal';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContentPage = ({ user, setUser, darkMode, toggleDarkMode, setShowLoginModal }) => {
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check auth token and redirect if not found
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/');
    }
  }, [navigate]);

  // ✅ Fetch contents once user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchContents();
    }
  }, [isLoggedIn]);

  // ✅ Fetch videos from correct backend API
  const fetchContents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/videos');
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();

      // Arrange videos into categories (assumes at least 12 items for demo)
      const formattedData = {
        trending: data.slice(0, 4),
        popular: data.slice(4, 8),
        newReleases: data.slice(8, 12)
      };

      setContents(formattedData);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Triggered when user starts a watch party
  const handleCreateWatchParty = (content) => {
    setSelectedContent(content || {
      _id: 'default',
      title: 'Sample Movie',
      genre: 'Action & Adventure',
      language: 'English',
      thumbnail: 'https://via.placeholder.com/300x200?text=Sample+Movie'
    });
    setShowWatchPartyModal(true);
  };

  const handleWatchNow = () => {
    if (contents?.trending?.length > 0) {
      navigate(`/watch/${contents.trending[0]._id}`);
    } else {
      navigate('/watch/default');
    }
  };

  const handleCloseModal = () => {
    setShowWatchPartyModal(false);
    setSelectedContent(null);
  };

  const handleCreateParty = (partyDetails) => {
    navigate(`/watch-party/${partyDetails.partyCode}`);
    setShowWatchPartyModal(false);
    setSelectedContent(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        setShowLoginModal={setShowLoginModal}
        onWatchNow={handleWatchNow}
      />

      <div className="flex">
        <Sidebar darkMode={darkMode} />
        <div className="ml-16 md:ml-64 pt-16 p-6 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <motion.div
                className={`h-16 w-16 border-4 rounded-full ${darkMode ? 'border-blue-500 border-t-transparent' : 'border-blue-600 border-t-transparent'}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-xl">{error}</div>
            </div>
          ) : contents ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pb-20"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Continue watching where you left off or discover something new.
                </p>
              </div>

              <ContentGrid
                title="Trending Now"
                contents={contents.trending}
                onCreateWatchParty={handleCreateWatchParty}
                darkMode={darkMode}
              />
              <ContentGrid
                title="Popular on StreamSync"
                contents={contents.popular}
                onCreateWatchParty={handleCreateWatchParty}
                darkMode={darkMode}
              />
              <ContentGrid
                title="New Releases"
                contents={contents.newReleases}
                onCreateWatchParty={handleCreateWatchParty}
                darkMode={darkMode}
              />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
              <div className="text-2xl font-bold">NO CONTENT FOUND</div>
            </div>
          )}
        </div>
      </div>

      {showWatchPartyModal && selectedContent && (
        <WatchPartyModal
          content={selectedContent}
          onClose={handleCloseModal}
          onCreateParty={handleCreateParty}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default ContentPage;
