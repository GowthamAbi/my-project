import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="block p-2 hover:bg-gray-700">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/dashboard" className="block p-2 hover:bg-gray-700">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/recurringExpense" className="block p-2 hover:bg-gray-700">Recurring Expense</Link>
        </li>
        <li className="mb-2">
          <Link to="/budgetForm" className="block p-2 hover:bg-gray-700">Budget Form</Link>
        </li>
        <li className="mb-2">
          <Link to="/budgetList" className="block p-2 hover:bg-gray-700">Budget List</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
