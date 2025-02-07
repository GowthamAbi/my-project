import React, { useState } from 'react';
import api from '../../../services/api'; // Assuming your API file to handle backend requests

const ExpenseRecording = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  const categories = ['Groceries', 'Entertainment', 'Utilities', 'Rent', 'Other']; // Sample categories

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date || !category || !description) {
      setError('All fields are required');
      return;
    }

    const expenseData = { amount, date, category, description };

    try {
      const response = await api.post('/api/expenses', expenseData); // Adjust API endpoint
      if (response.status === 200) {
        alert('Expense recorded successfully!');
        // Optionally, reset form or navigate to another page
      } else {
        setError('Failed to record expense');
      }
    } catch (err) {
      setError('Error recording expense');
    }
  };

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Record an Expense</h2>
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
          <label htmlFor="date" className="block text-sm font-medium">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            placeholder="Details about the expense"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </section>
  );
};

export default ExpenseRecording;
