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
    <form onSubmit={handleSubmit} className="space-y-2 dark:bg-gray-900">
      <input type="text" value={category} required onChange={(e) => setCategory(e.target.value)}
        placeholder="Category" className="border p-2 w-full"/>
      <input type="number" value={amount} required onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount" className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Budget</button>
    </form>
    <div><ExportData/></div>
    <div><BudgetChart/></div>

    </div>
  );
};

export default BudgetForm;
