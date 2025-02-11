import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchTotals = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/transactions", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            checkFinancialStatus(response.data); // No need for .json() as axios handles it
        } catch (error) {
            console.error("Error fetching totals:", error);
        }
    };
    
    useEffect(() => {
        fetchTotals();
    }, []);

    const checkFinancialStatus = (data) => {
        let newNotifications = [];

        if (data.income < data.expense) {
            newNotifications.push("Warning: Your expenses are higher than your income!");
        }
        if (data.expense > data.budget) {
            newNotifications.push("Alert: Your expenses exceed your budget!");
        }
        if (data.goal > data.budget) {
            newNotifications.push("Reminder: Your goal amount is greater than your budget!");
        }

        setNotifications(newNotifications);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="relative">
            <button className="p-2 bg-gray-200 rounded-full relative">
                🔔
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
                        {notifications.length}
                    </span>
                )}
            </button>
            {notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md p-2">
                    {notifications.map((note, index) => (
                        <div key={index} className="text-red-600 text-sm p-2 border-b">
                            {note}
                        </div>
                    ))}
                    <button
                        className="mt-2 w-full bg-red-500 text-white p-2 rounded-md"
                        onClick={clearNotifications}
                    >
                        Clear Notifications
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
