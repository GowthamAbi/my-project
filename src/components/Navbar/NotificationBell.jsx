import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // ✅ Connect to WebSocket with correct settings
        const socket = io("http://localhost:5000", {
            transports: ["websocket", "polling"], // ✅ Ensures WebSocket works
            withCredentials: true, // Allows cross-origin cookies
        });

        // ✅ Listen for budget alerts
        socket.on("budgetAlert", (alert) => {
            setNotifications((prev) => [...prev, { message: alert, timestamp: new Date() }]);
        });

        return () => socket.disconnect(); // Cleanup on component unmount
    }, []);

    return (
        <div className="relative">
            <button
                className="text-white relative"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <i className="fas fa-bell text-2xl"></i>
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-2">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {showDropdown && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg overflow-hidden">
                    {notifications.map((note, index) => (
                        <div key={index} className="text-black px-4 py-2 border-b">
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
