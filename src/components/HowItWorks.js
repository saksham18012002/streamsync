import React from 'react';

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create a Watch Room",
      description: "Start by creating a private room and inviting friends with a simple link.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
        </svg>
      )
    },
    {
      id: 2,
      title: "Share Your Content",
      description: "Paste a URL or upload your video to start watching together.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
        </svg>
      )
    },
    {
      id: 3,
      title: "Sync & Chat",
      description: "Everyone's video stays perfectly in sync while you chat in real-time.",
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How StreamSync Works</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Watching together has never been easier. Follow these simple steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center hover:bg-white/20 transition-all">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-purple-200">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            <span>No downloads required - works in your browser</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;