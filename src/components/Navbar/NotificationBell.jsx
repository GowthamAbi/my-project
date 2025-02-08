import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Connect to the backend server for real-time notifications
        const socket = io('http://localhost:3000', {
            withCredentials: true, // This ensures cookies/credentials are sent
          });

        // Listen for 'budgetAlert' event from the server
        socket.on('budgetAlert', (alert) => {
            // Adding a timestamp to each notification for better context
            setNotifications((prev) => [
                ...prev,
                { ...alert, timestamp: new Date() }
            ]);
        });

        return () => socket.disconnect();  // Clean up the socket connection on component unmount
    }, []);

    return (
        <div className="relative">
            <button className="text-white">
                <i className="fas fa-bell"></i>
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Show notifications in a dropdown-style UI */}
            {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
                    {notifications.map((note, index) => (
                        <div key={index} className="text-black px-4 py-2">
                            {/* Display the notification message and timestamp */}
                            <div>{note.message}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(note.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
