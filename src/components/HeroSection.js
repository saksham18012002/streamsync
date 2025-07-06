import React from 'react';

function HeroSection({ isLoggedIn, setShowSignupModal, handleLearnMore }) {
  return (
    <section className="hero-gradient text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Watch Together, <br />Miles Apart
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Synchronize your streaming experience with friends and family, no matter where they are. Share reactions, chat, and enjoy content together in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!isLoggedIn && (
                <button 
                  onClick={() => setShowSignupModal(true)}
                  className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                </button>
              )}
              <button 
                onClick={handleLearnMore}
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/20 floating">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="bg-gray-900 p-3 flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-sm text-gray-400">StreamSync Player</div>
                </div>
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">JD</div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">KL</div>
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">MR</div>
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs">+2</div>
                      </div>
                      <div className="text-white text-sm">Watching together</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-800">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>00:15:30</span>
                    <span>00:45:10</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs mr-2">KL</div>
                  <div className="bg-blue-600/20 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">No way! I didn't see that coming 😱</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-purple-600/20 rounded-lg p-2 max-w-[80%]">
                    <p className="text-sm">I know right? The plot twist was amazing!</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs ml-2">JD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;