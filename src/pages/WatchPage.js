import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WatchPage = () => {
  const { contentId } = useParams();

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-16 p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Watch Content ID: {contentId}</h1>
        <div className="bg-gray-800 w-full aspect-video flex items-center justify-center">
          <p className="text-xl">Video Player will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;