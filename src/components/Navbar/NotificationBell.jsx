import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('budgetAlert', (alert) => {
            setNotifications((prev) => [...prev, alert]);
        });

        return () => socket.disconnect();
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
            {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
                    {notifications.map((note, index) => (
                        <div key={index} className="text-black px-4 py-2">
                            {note}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
