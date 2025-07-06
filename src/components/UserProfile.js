import React from 'react';

function UserProfile({ user, handleLogout, setProfileOpen }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || "User"}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "user@example.com"}</p>
      </div>
      
      <a 
        href="#" 
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={(e) => {
          e.preventDefault();
          setProfileOpen(false);
        }}
      >
        Your Profile
      </a>
      
      <a 
        href="#" 
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={(e) => {
          e.preventDefault();
          setProfileOpen(false);
        }}
      >
        Watch History
      </a>
      
      <a 
        href="#" 
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={(e) => {
          e.preventDefault();
          setProfileOpen(false);
        }}
      >
        Settings
      </a>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => {
            handleLogout();
            setProfileOpen(false);
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default UserProfile;