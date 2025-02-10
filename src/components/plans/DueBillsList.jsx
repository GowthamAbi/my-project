import React, { useState, useEffect } from "react";
import api from "../../services/api";

const DueDatesList = () => {
    const [dueExpenses, setDueExpenses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDueExpenses = async () => {
            try {
                const response = await api.get("/api/expenses/recurring");
                setDueExpenses(response.data);
            } catch (err) {
                setError("Error fetching due expenses");
            }
        };

        fetchDueExpenses();
    }, []);

    // ✅ Fix: Ensure `nextDue` is formatted correctly before sending to backend
    const handleUpdateNextDue = async (id, newNextDue) => {
        try {
            const formattedDate = new Date(newNextDue).toISOString(); // ✅ Convert to ISO format

            const response = await api.patch(`/api/expenses/recurring/${id}`, { nextDue: formattedDate });

            if (response.status === 200) {
                setDueExpenses((prevExpenses) =>
                    prevExpenses.map(expense =>
                        expense._id === id ? { ...expense, nextDue: formattedDate } : expense
                    )
                );
            } else {
                console.error("❌ Failed to update nextDue", response);
            }
        } catch (err) {
            console.error("❌ Error updating nextDue:", err);
        }
    };

    // ✅ Fix: Add handleDelete function
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/expenses/recurring/${id}`);
            setDueExpenses(dueExpenses.filter(expense => expense._id !== id));
        } catch (err) {
            console.error("❌ Error deleting expense:", err);
        }
    };

    return (
        <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Due Dates List</h2>
            
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {dueExpenses.length > 0 ? (
                <table className="min-w-full table-auto text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-sm text-gray-700">Amount</th>
                            <th className="px-4 py-2 text-sm text-gray-700">Category</th>
                            <th className="px-4 py-2 text-sm text-gray-700">Description</th>
                            <th className="px-4 py-2 text-sm text-gray-700">Interval</th>
                            <th className="px-4 py-2 text-sm text-gray-700">Next Due</th>
                            <th className="px-4 py-2 text-sm text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dueExpenses.map((expense) => (
                            <tr key={expense._id} className="border-b">
                                <td className="px-4 py-2">{expense.amount}</td>
                                <td className="px-4 py-2">{expense.category}</td>
                                <td className="px-4 py-2">{expense.description}</td>
                                <td className="px-4 py-2">{expense.interval}</td>
                                <td className="px-4 py-2">
                                    {expense.nextDue ? new Date(expense.nextDue).toLocaleDateString("en-GB") : "No Due Date"}
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="date"
                                        onChange={(e) => handleUpdateNextDue(expense._id, e.target.value)}
                                        className="border border-gray-300 rounded p-2"
                                    />
                                    <button
                                        onClick={() => handleDelete(expense._id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 ml-2"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">No due expenses found</p>
            )}
        </section>
    );
};

export default DueDatesList;
