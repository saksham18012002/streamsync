import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTASection from '../components/CTASection';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import api from '../api/axios';

function LandingPage({
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
  showLoginModal,
  setShowLoginModal,
  showSignupModal,
  setShowSignupModal,
  darkMode,
  toggleDarkMode
}) {
  // ✅ LOGIN FUNCTION (REAL API)
  const handleLogin = async ({ email, password }) => {
    try {
      console.log('Sending login request...', email, password);

      const res = await api.post('/users/login', { email, password });
      const { user } = res.data;

      setUser(user);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data?.message) {
        alert("Login failed: " + error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };


  // ✅ SIGNUP FUNCTION
  const handleSignup = async ({ name, email, password }) => {
    try {
      console.log('Sending signup request...', name, email);

      const res = await api.post(
        '/users/register',
        { name, email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('Signup response:', res.data);

      // If backend sends user data after signup
      if (res.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setIsLoggedIn(true);
        setShowSignupModal(false);
        alert('Signup successful!');
      } else {
        alert(res.data?.message || 'Signup successful! Please login.');
        setShowSignupModal(false);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        user={user}
        setShowLoginModal={setShowLoginModal}
      />

      <main className="flex-grow">
        <HeroSection
          isLoggedIn={isLoggedIn}
          setShowSignupModal={setShowSignupModal}
          handleLearnMore={handleLearnMore}
          darkMode={darkMode}
        />

        <HowItWorks darkMode={darkMode} />
        <Features darkMode={darkMode} />

        <CTASection
          isLoggedIn={isLoggedIn}
          setShowSignupModal={setShowSignupModal}
          darkMode={darkMode}
        />
      </main>

      <Footer darkMode={darkMode} />

      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          handleLogin={handleLogin}
          darkMode={darkMode}
        />
      )}

      {showSignupModal && (
        <SignupModal
          setShowSignupModal={setShowSignupModal}
          setShowLoginModal={setShowLoginModal}
          handleSignup={handleSignup}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default LandingPage;
