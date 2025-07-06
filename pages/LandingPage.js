import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CTASection from '../components/CTASection';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

function LandingPage({ isLoggedIn, setIsLoggedIn, user, setUser }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  
  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowSignupModal(false);
  };

  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeroSection 
        isLoggedIn={isLoggedIn} 
        setShowSignupModal={setShowSignupModal}
        handleLearnMore={handleLearnMore}
      />
      
      <HowItWorks />
      <Features />
      
      <CTASection 
        isLoggedIn={isLoggedIn} 
        setShowSignupModal={setShowSignupModal} 
      />
      
      {showLoginModal && (
        <LoginModal 
          setShowLoginModal={setShowLoginModal} 
          setShowSignupModal={setShowSignupModal}
          handleLogin={handleLogin}
        />
      )}
      
      {showSignupModal && (
        <SignupModal 
          setShowSignupModal={setShowSignupModal} 
          setShowLoginModal={setShowLoginModal}
          handleSignup={handleSignup}
        />
      )}
    </>
  );
}

export default LandingPage;