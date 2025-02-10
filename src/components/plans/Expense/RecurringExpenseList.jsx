import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; // Ensure correct API import

const RecurringExpenseList = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      try {
        const response = await api.get('/api/expenses/recurring'); // ✅ Ensure backend route exists
        setRecurringExpenses(response.data);
      } catch (err) {
        setError('Error fetching recurring expenses');
        console.error('❌ Error fetching recurring expenses:', err);
      } finally {
        setLoading(false); // ✅ Stop loading after request
      }
    };

    fetchRecurringExpenses();
  }, []);

  // ✅ Handle Expense Deletion with Confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recurring expense?')) {
      return;
    }
    try {
      await api.delete(`/api/expenses/recurring/${id}`);
      setRecurringExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== id)
      );
    } catch (err) {
      console.error('❌ Error deleting expense:', err);
      setError('Failed to delete expense');
    }
  };

  return (
    <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Recurring Expense List</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : recurringExpenses.length > 0 ? (
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm text-gray-700">Amount</th>
              <th className="px-4 py-2 text-sm text-gray-700">Category</th>
              <th className="px-4 py-2 text-sm text-gray-700">Description</th>
              <th className="px-4 py-2 text-sm text-gray-700">Interval</th>
              <th className="px-4 py-2 text-sm text-gray-700">Next Due</th>
              <th className="px-4 py-2 text-sm text-gray-700">Action</th>
              <th className="px-4 py-2 text-sm text-gray-700">Remove</th>
            </tr>
          </thead>

          <tbody>
            {recurringExpenses.map((expense) => (
              <tr key={expense._id} className="border-b">
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2">{expense.description}</td>
                <td className="px-4 py-2">{expense.interval}</td>
                <td className="px-4 py-2">
                  {expense.nextDue ? new Date(expense.nextDue).toLocaleDateString() : 'No Due Date'}
                </td>
                <td className="px-4 py-2">
                  {/* You can add any other actions here, like editing */}
                  <button
                    onClick={() => console.log('Edit action for:', expense._id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No recurring expenses found</p>
      )}
    </section>
  );
};

export default RecurringExpenseList;
