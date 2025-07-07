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

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      // In a real app, you would check for a token in localStorage or cookies
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    // Only fetch content if user is logged in
    if (isLoggedIn) {
      fetchContents();
    }
  }, [isLoggedIn]);

  const fetchContents = async () => {
    try {
      // Simulating API call with timeout
      setTimeout(() => {
        // Sample data - replace with actual API call
        const mockData = {
          trending: [
            { id: 1, title: 'Stranger Things', genre: 'Sci-Fi & Fantasy', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Stranger+Things' },
            { id: 2, title: 'Money Heist', genre: 'Crime & Thriller', language: 'Spanish', posterUrl: 'https://via.placeholder.com/300x200?text=Money+Heist' },
            { id: 3, title: 'Squid Game', genre: 'Drama & Thriller', language: 'Korean', posterUrl: 'https://via.placeholder.com/300x200?text=Squid+Game' },
            { id: 4, title: 'The Witcher', genre: 'Fantasy', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=The+Witcher' },
          ],
          popular: [
            { id: 5, title: 'Breaking Bad', genre: 'Crime & Drama', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Breaking+Bad' },
            { id: 6, title: 'Game of Thrones', genre: 'Fantasy & Drama', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Game+of+Thrones' },
            { id: 7, title: 'Friends', genre: 'Comedy', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Friends' },
            { id: 8, title: 'The Office', genre: 'Comedy', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=The+Office' },
          ],
          newReleases: [
            { id: 9, title: 'Loki', genre: 'Sci-Fi & Fantasy', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Loki' },
            { id: 10, title: 'Foundation', genre: 'Sci-Fi', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Foundation' },
            { id: 11, title: 'Dune', genre: 'Sci-Fi & Adventure', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=Dune' },
            { id: 12, title: 'No Time to Die', genre: 'Action & Adventure', language: 'English', posterUrl: 'https://via.placeholder.com/300x200?text=No+Time+to+Die' },
          ]
        };
        
        setContents(mockData);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch content. Please try again later.');
      setLoading(false);
    }
  };

  const handleCreateWatchParty = (content) => {
    if (content) {
      setSelectedContent(content);
      setShowWatchPartyModal(true);
    } else {
      // If no content is provided, use a default content object
      setSelectedContent({
        id: 'default',
        title: 'Sample Movie',
        genre: 'Action & Adventure',
        language: 'English',
        posterUrl: 'https://via.placeholder.com/300x200?text=Sample+Movie'
      });
      setShowWatchPartyModal(true);
    }
  };

  const handleWatchNow = () => {
    // When Watch Now is clicked without specific content, show first trending item or default
    if (contents && contents.trending && contents.trending.length > 0) {
      navigate(`/watch/${contents.trending[0].id}`);
    } else {
      // If no content is loaded yet, navigate to a default watch page
      navigate('/watch/default');
    }
  };

  const handleCloseModal = () => {
    setShowWatchPartyModal(false);
    // Clear selected content when modal is closed
    setSelectedContent(null);
  };

  const handleCreateParty = (partyDetails) => {
    // Navigate to watch party page with the generated code
    navigate(`/watch-party/${partyDetails.partyCode}`);
    setShowWatchPartyModal(false);
    // Clear selected content
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
          ) : contents && Object.keys(contents).length > 0 ? (
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

      {showWatchPartyModal && (
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