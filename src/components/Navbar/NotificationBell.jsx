//Notification.jsx

import React, { useState, useEffect } from 'react';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from an API or state
    setNotifications([{ id: 1, text: 'Upcoming bill due in 3 days!' }]);
  }, []);

  return (
    <div className="relative">
      <button className="text-white">
        <i className="fas fa-bell"></i>
      </button>
      {notifications.length > 0 && (
        <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1">
          {notifications.length}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
