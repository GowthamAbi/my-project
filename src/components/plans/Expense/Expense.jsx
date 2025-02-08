//expanse Add
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api'; // Axios instance with Authorization setup

const ExpenseRecording = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [expenses, setExpenses] = useState([]);
  
  const categories = ['select','Groceries', 'Entertainment', 'Utilities', 'Rent', 'Other']; // Sample categories
  const navigate = useNavigate();
  
  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Fetch the expenses from the server
        const response = await api.get('/api/expenses');
        setExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        if (err.response && err.response.status === 401) {
          alert("Unauthorized. Please log in again.");
          navigate('/login'); // Redirect to login page if unauthorized
        } else {
          setError('Failed to fetch expenses');
        }
      }
    };

    fetchExpenses();
  }, [navigate]);

  // Handle expense form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(amount)
    console.log(date)
    console.log(category)
    console.log(description)
    if (!amount || !date || !category || !description) {
      setError('All fields are required');
      return ;
    }

    const expenseData = { amount, date, category, description };

    try {
      const response = await api.post('/api/expenses', expenseData);
      console.log(response.status)
      if (response.status === 201) {
        alert('Expense recorded successfully!');
        setAmount('');
        setDate('');
        setCategory('');
        setDescription('');
        setError('');

      }
    } catch (err) {
      console.error('Error recording expense:', err);
      if (err.response && err.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate('/login'); // Redirect to login page if unauthorized
      } else {
        setError('Error recording expense');
      }
    }
  };

  return (
    <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
    <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">Record an Expense</h2>
    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      <div>
        <label htmlFor="amount" className="block text-lg font-medium text-gray-600">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-lg font-medium text-gray-600">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-lg font-medium text-gray-600">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-600">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Details about the expense"
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Expense
      </button>
    </form>
    <button >ExpenseList</button>
  </section>
  );
};

export default ExpenseRecording;
