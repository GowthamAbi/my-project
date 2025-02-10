import React, { useState } from 'react';
import api from '../../../services/api';

const RecurringExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [interval, setInterval] = useState('Select');
  const [nextDue, setNextDue] = useState(''); // ✅ Added nextDue field
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Select', 'Rent', 'Subscription', 'Utilities', 'Groceries'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    if (isRecurring && (interval === 'Select' || !nextDue)) {
      setError('Please select a valid interval and due date for recurring expenses');
      return;
    }

    const recurringData = {
      amount,
      category,
      description,
      isRecurring, // ✅ Ensure this is `true`
      ...(isRecurring && { interval, nextDue: new Date(nextDue) }) // ✅ Include only for recurring expenses
    };

    try {
      const response = await api.post('/api/expenses/recurring', recurringData);
      if (response.status === 201) {
        setSuccess('Recurring expense added successfully!');
        setAmount('');
        setCategory('');
        setDescription('');
        setIsRecurring(false);
        setInterval('Select');
        setNextDue('');
        setError('');
      } else {
        setError('Failed to add recurring expense');
        setSuccess('');
      }
    } catch (err) {
      setError('Error adding recurring expense');
      setSuccess('');
    }
  };

  return (
    <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-xl">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add Recurring Expense</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Details about the expense"
            required
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isRecurring"
            checked={isRecurring}
            onChange={() => setIsRecurring(!isRecurring)}
            className="w-4 h-4 border-gray-300 rounded"
          />
          <label htmlFor="isRecurring" className="ml-2 text-sm text-gray-700">Is this a recurring expense?</label>
        </div>

        {isRecurring && (
          <>
            <div className="mb-6">
              <label htmlFor="interval" className="block text-sm font-medium text-gray-700">Recurring Interval</label>
              <select
                id="interval"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Select">Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="nextDue" className="block text-sm font-medium text-gray-700">Next Due Date</label>
              <input
                type="date"
                id="nextDue"
                value={nextDue}
                onChange={(e) => setNextDue(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}

        <div className="flex justify-center">
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default RecurringExpense;
