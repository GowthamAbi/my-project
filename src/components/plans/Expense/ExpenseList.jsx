import React, { useState, useEffect } from 'react';
import api from '../../../services/api'; // Assuming your API file to handle backend requests

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/api/expenses');
        setExpenses(response.data);
      } catch (err) {
        setError('Error fetching expenses');
        console.error('Error fetching expenses', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-4xl">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Expense List</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {expenses.length > 0 ? (
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm text-gray-700">Amount</th>
              <th className="px-4 py-2 text-sm text-gray-700">Category</th>
              <th className="px-4 py-2 text-sm text-gray-700">Description</th>
              <th className="px-4 py-2 text-sm text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="border-b">
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{expense.category}</td>
                <td className="px-4 py-2">{expense.description}</td>
                <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No expenses found</p>
      )}
      <button>ExpenseCategorization</button>
    </section>
  );
};

export default ExpenseList;
