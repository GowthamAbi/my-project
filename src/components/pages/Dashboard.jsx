import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../services/api';

// Import all required components
import ExpenseRecording from '../plans/Expense/Expense';
import ExpenseList from '../plans/Expense/ExpenseList';
import ExpenseCategorization from '../plans/Expense/ExpenseCategorization';
import RecurringExpense from '../plans/Expense/ExpenseRecurring';
import RecurringExpenseList from '../plans/Expense/RecurringExpenseList';
import BudgetForm from '../plans/Budget/BudgetForm';
import BudgetChart from '../plans/Budget/BudgetChart';
import FinancialGoals from '../plans/Goals/FinancialGoals';
import FinancialReports from '../plans/Report/FinancialReports';
import IncomeReports from '../plans/Income/IncomeReports';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [dueBills, setDueBills] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [expenseRes, budgetRes, billsRes] = await Promise.all([
                api.get('/api/expenses'),
                api.get('/api/budgets'),
                api.get('/api/due-bills'), // ✅ Fixed API route
            ]);
            setExpenses(expenseRes.data);
            setBudgets(budgetRes.data);
            setDueBills(billsRes.data);
        } catch (error) {
            console.error('❌ Error fetching dashboard data:', error);
        }
    };

    const chartData = {
        labels: budgets.map((b) => b.category),
        datasets: [
            {
                label: 'Budget',
                data: budgets.map((b) => b.amount),
                backgroundColor: '#3b82f6'
            },
            {
                label: 'Spent',
                data: budgets.map((b) => {
                    const totalSpent = expenses
                        .filter((e) => e.category === b.category)
                        .reduce((sum, e) => sum + e.amount, 0);
    
                    // 🔔 Show alert if spent amount is greater than budget
                    if (totalSpent > b.amount) {
                        alert(`⚠️ Warning: Expenses for '${b.category}' exceed budget!`);
                    }
    
                    return totalSpent;
                }),
                backgroundColor: '#ef4444'
            }
        ]
    };
    
      
        
    
    
    return (
        <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-6`}>
            {/* Header & Toggle */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📊 Expense Dashboard</h1>
                <button className="p-2 rounded-lg bg-blue-600 text-white" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>

            {/* Expense Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg">Total Budget</h2>
                    <p className="text-2xl font-bold">${budgets.reduce((sum, b) => sum + b.amount, 0)}</p>
                </div>
                <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg">Total Expenses</h2>
                    <p className="text-2xl font-bold">${expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg">Remaining Budget</h2>
                    <p className="text-2xl font-bold">${budgets.reduce((sum, b) => sum + b.amount, 0) - expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
                </div>
            </div>

            {/* Budget vs Expenses Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Budget vs. Expenses</h2>
                <Bar data={chartData} />
            </div>

            {/* 🔔 Upcoming Bills Section */}
            {dueBills.length > 0 && (
                <div className="bg-yellow-200 p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold text-yellow-900">⚠️ Upcoming Bills</h2>
                    <ul className="mt-2">
                        {dueBills.map((bill, index) => (
                            <li key={index} className="text-yellow-800">
                                {bill.name} - Due on {new Date(bill.dueDate).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Expense Management Sections */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-center">💰 Expense Management</h2>
                <section className="mb-8"><ExpenseRecording /></section>
                <section className="mb-8"><ExpenseList /></section>
                <section className="mb-8"><ExpenseCategorization /></section>
                <section className="mb-8"><RecurringExpense /></section>
                <section className="mb-8"><RecurringExpenseList /></section>
            </div>

            {/* Budget Management Sections */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold text-center">📊 Budget & Goals</h2>
                <section className="mb-8"><BudgetForm /></section>
                <section className="mb-8"><BudgetChart /></section>
            </div>

            {/* Financial Goals & Reports */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6"><FinancialGoals /></div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6"><FinancialReports /></div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6"><IncomeReports /></div>
        </div>
    );
};

export default Dashboard;
