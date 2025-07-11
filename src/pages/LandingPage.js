import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTASection from '../components/CTASection';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

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
  const handleLogin = (userData) => {
    // Store auth token in localStorage for persistence
    localStorage.setItem('authToken', 'sample-token');
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleSignup = async ({ name, email, password }) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          phone: "0000000000"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        setUser(data.user); // optional
        setIsLoggedIn(true);
        setShowSignupModal(false);
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
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
