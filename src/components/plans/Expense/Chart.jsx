import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseCategorization = () => {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/api/expenses');
        setExpenses(response.data);
        categorizeExpenses(response.data);
      } catch (err) {
        console.error('Error fetching expenses', err);
      }
    };

    fetchExpenses();
  }, []);

  const categorizeExpenses = (expenses) => {
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    setCategoryData(categories);
  };

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Expense Categorization</h2>
      <Bar data={chartData} />
    </section>
  );
};

export default ExpenseCategorization;
