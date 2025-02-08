import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import NotificationBell from './components/Navbar/NotificationBell';
import RecurringExpense from './components/plans/Expense/ExpenseRecurring';
import BudgetForm from './components/plans/Budget/BudgetForm';
import BudgetList from './components/plans/Budget/BudgetList';



const App = () => {
  return (  
    <Router>
      <Navbar />
      <NotificationBell />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recurringExpense" element={<RecurringExpense/>} />
        <Route path="/budgetForm" element={<BudgetForm/>} />
        <Route path="/budgetList" element={<BudgetList/>} />
      </Routes>
    </Router>
  );
};

export default App;
