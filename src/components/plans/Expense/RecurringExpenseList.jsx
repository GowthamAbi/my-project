//Monthly payment List
import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; // Assuming your API file to handle backend requests

const RecurringExpenseList = () => {
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecurringExpenses = async () => {
      try {
        const response = await api.get('/api/expenses/recurring'); // Adjust the endpoint if necessary
        setRecurringExpenses(response.data);
      } catch (err) {
        setError('Error fetching recurring expenses');
        console.error('Error fetching recurring expenses', err);
      }
    };

    fetchRecurringExpenses();
  }, []);

  return (
    <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Recurring Expense List</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {recurringExpenses.length > 0 ? (
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm text-gray-700">Amount</th>
              <th className="px-4 py-2 text-sm text-gray-700">Category</th>
              <th className="px-4 py-2 text-sm text-gray-700">Description</th>
              <th className="px-4 py-2 text-sm text-gray-700">Interval</th>
              <th className="px-4 py-2 text-sm text-gray-700">Next Due</th>
            </tr>
          </thead>
          <tbody>
            {recurringExpenses.map((expense) => (
              <tr key={expense._id} className="border-b">
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2">{expense.description}</td>
                <td className="px-4 py-2">{expense.interval}</td>
                <td className="px-4 py-2">{new Date(expense.nextDue).toLocaleDateString()}</td>
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
