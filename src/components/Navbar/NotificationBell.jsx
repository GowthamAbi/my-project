import React, { useState, useEffect, useRef } from 'react';

const NotificationBell = () => {
  // Load notifications from localStorage or default messages
  const [notifications, setNotifications] = useState(() => {
    return JSON.parse(localStorage.getItem('notifications')) || [
      "Upcoming bill due tomorrow",
      "Budget limit reached for Groceries",
    ];
  });

  // Dropdown visibility state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Function to add a new notification dynamically
  const addNotification = (message) => {
    setNotifications((prev) => [message, ...prev]); // Add new alert at the top
    setIsDropdownOpen(true); // Open dropdown when a new notification arrives
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]); // Clear the array
    localStorage.removeItem('notifications'); // Remove from storage
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Notification Bell Icon */}
      <button onClick={toggleDropdown} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ">
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
          <ul className="py-2 max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">No new notifications</li>
            ) : (
              notifications.map((note, index) => (
                <li key={index} className="px-4 py-2 border-b last:border-none">
                  {note}
                </li>
              ))
            )}
          </ul>
          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="w-full text-center bg-red-500 text-white py-2 hover:bg-red-600"
            >
              Clear All
            </button>
          )}
        </div>
      )}


    </div>
  );
};

export default NotificationBell;
