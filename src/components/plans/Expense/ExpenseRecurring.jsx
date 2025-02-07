import React, { useState } from 'react';
import api from '../../../services/api'; // Assuming your API file to handle backend requests

const RecurringExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [interval, setInterval] = useState('Monthly');
  const [error, setError] = useState('');

  const categories = ['Rent', 'Subscription', 'Utilities', 'Groceries'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      setError('All fields are required');
      return;
    }

    const recurringData = { amount, category, description, isRecurring, interval };

    try {
      const response = await api.post('/api/expenses/recurring', recurringData); // Adjust API endpoint
      if (response.status === 200) {
        alert('Recurring expense added successfully!');
      } else {
        setError('Failed to add recurring expense');
      }
    } catch (err) {
      setError('Error adding recurring expense');
    }
  };

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Recurring Expense</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            required
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isRecurring" className="inline-flex items-center text-sm">
            <input
              type="checkbox"
              id="isRecurring"
              checked={isRecurring}
              onChange={() => setIsRecurring(!isRecurring)}
              className="w-4 h-4"
            />
            <span className="ml-2">Is this a recurring expense?</span>
          </label>
        </div>

        {isRecurring && (
          <div className="mb-4">
            <label htmlFor="interval" className="block text-sm font-medium">Recurring Interval</label>
            <select
              id="interval"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </section>
  );
};

export default RecurringExpense;
