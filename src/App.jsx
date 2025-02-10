import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import NotificationBell from "./components/Navbar/NotificationBell";
import RecurringExpense from "./components/plans/Expense/ExpenseRecurring";
import BudgetForm from "./components/plans/Budget/BudgetForm";
import BudgetList from "./components/plans/Budget/BudgetList";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Top Navbar */}
        <Navbar />
        
        {/* Main Layout with Sidebar and Content */}
        <div className="flex flex-grow">
          {/* Sidebar Stays F*/}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 p-4">
            <NotificationBell /> {/* NotificationBell inside content area */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recurringExpense" element={<RecurringExpense />} />
              <Route path="/budgetForm" element={<BudgetForm />} />
              <Route path="/budgetList" element={<BudgetList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
