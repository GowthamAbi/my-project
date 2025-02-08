import React, { useState } from "react";
import axios from "axios";
import api from '../../../services/api'; // Axios instance with Authorization setup
import ExportData from "./ExportData";
import BudgetChart from "./BudgetChart";


const BudgetForm = ({ setBudgets }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
const[error,setError]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{    
        const response = await api.post('/api/budgets', { category, amount });
        console.log(response.status)
      if (response.status === 201) {
        alert('Budget recorded successfully!');
        setAmount('');
        setCategory('');
        setError('')
      }
    } catch (err) {
      console.error('Error Budget Recording:', err);
      if (err.response && err.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate('/login'); // Redirect to login page if unauthorized
      } else {
        setError('Error recording budget');
      }
    }


  };

  return (
    <div>
      <section className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 max-w-xl">
    <form onSubmit={handleSubmit} className="space-y-2 dark:bg-gray-900">
      <h2 className="text-3xl font-semibold text-center text-black-700 mb-8">BudgetForm</h2>
      <input type="text" value={category} required onChange={(e) => setCategory(e.target.value)}
        placeholder="Category" className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <input type="number" value={amount} required onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount" className="w-full border border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Add Budget</button>
    </form>
    </section>


    </div>
  );
};

export default BudgetForm;
