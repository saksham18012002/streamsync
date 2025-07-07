import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ContentPage from './pages/ContentPage';
import WatchPage from './pages/WatchPage';
import LoginPage from './pages/LoginPage';
import AuthGuard from './components/AuthGuard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // In a real app, you would decode the token or fetch user info
      setUser({ name: 'User' }); // Placeholder
    }
    
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              showSignupModal={showSignupModal}
              setShowSignupModal={setShowSignupModal}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            <LoginPage 
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          } 
        />
        <Route 
          path="/browse" 
          element={
            <AuthGuard isLoggedIn={isLoggedIn} redirectTo="/">
              <ContentPage 
                user={user}
                setUser={setUser}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                setShowLoginModal={setShowLoginModal}
              />
            </AuthGuard>
          } 
        />
        <Route 
          path="/watch/:contentId" 
          element={
            <AuthGuard isLoggedIn={isLoggedIn} redirectTo="/">
              <WatchPage 
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </AuthGuard>
          } 
        />
        <Route 
          path="/watch-party/:partyCode" 
          element={
            <AuthGuard isLoggedIn={isLoggedIn} redirectTo="/">
              <WatchPage 
                user={user}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                isParty={true}
              />
            </AuthGuard>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;