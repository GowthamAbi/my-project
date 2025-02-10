import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSettings,FiSum, FiLogOut } from "react-icons/fi";
import { FiDollarSign, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { FaCalculator } from "react-icons/fa";  // FontAwesome calculator
import { MdSummarize } from "react-icons/md";   // Material UI summarize icon

import { FaMoneyBillWave, FaClipboardList, FaBullseye, FaWallet, FaChartPie, FaFileExport } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({
    dashboard: false,
    budget: false,
    expense: false,
    income: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-3">
        {/* Dashboard - Toggles Submenu */}
        <li>
          <button
            onClick={() => toggleSection("dashboard")}
            className="flex items-center justify-between w-full p-2 hover:bg-blue-700 rounded-md"
          >
            <span className="flex items-center gap-2">
              <FiHome /> Dashboard
            </span>
            <span>{openSections.dashboard ? "▲" : "▼"}</span>
          </button>

          {/* Expanded Dashboard Submenu */}
          {openSections.dashboard && (
            <ul className="pl-6 space-y-2">
              {/* Budget Section */}
              <li>
                <button
                  onClick={() => toggleSection("budget")}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded"
                >
                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave /> Budget
                  </span>
                  <span>{openSections.budget ? "▲" : "▼"}</span>
                </button>
                {openSections.budget && (
                  <ul className="pl-6 space-y-1">
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budget/from")}>From</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budget/list")}>List</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budget/chart")}>Chart</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budget/exportdata")}>Export Data</li>
                  </ul>
                )}
              </li>

              {/* Expense Section */}
              <li>
                <button
                  onClick={() => toggleSection("expense")}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded"
                >
                  <span className="flex items-center gap-2">
                    <FaClipboardList /> Expense
                  </span>
                  <span>{openSections.expense ? "▲" : "▼"}</span>
                </button>
                {openSections.expense && (
                  <ul className="pl-6 space-y-1">
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/expense")}>Expense</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/list")}>List</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/chart")}>Chart</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/recurring")}>Recurring</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/recurring-list")}>Recurring List</li>
                  </ul>
                )}
              </li>

              {/* Goals */}
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/goals")}>
                <FaBullseye /> Goals
              </li>

              {/* Income Section */}
              <li>
                <button
                  onClick={() => toggleSection("income")}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded"
                >
                  <span className="flex items-center gap-2">
                    <FaWallet /> Income
                  </span>
                  <span>{openSections.income ? "▲" : "▼"}</span>
                </button>
                {openSections.income && (
                  <ul className="pl-6 space-y-1">
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/income/from")}>From</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/income/list")}>List</li>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/income/report")}>Report</li>
                  </ul>
                )}
              </li>

              {/* All Reports */}
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/reports")}>
                <FaChartPie /> All Reports
              </li>

              {/* Due Bill List */}
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/du-bill-list")}>
                <FaFileExport /> Due Bill List
              </li>
            </ul>
          )}
        </li>

        {/* Profile Settings */}
        <li className="flex items-center space-x-3 hover:bg-blue-700 p-2 rounded-md">
          <FiUser />
          <Link to="/api/auth/profile" className="block py-2 rounded">Profile Settings</Link>
        </li>

        <li className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded-md mt-4">
        <FiSum size={24} color="white" />
        <FiDollarSign size={24} color="white" />   // Dollar sign
<FiTrendingUp size={24} color="white" />   // Upward trend (income)
<FiTrendingDown size={24} color="white" /> // Downward trend (expense)
<FaCalculator size={24} color="white" />   // Calculator (sum-related)

          <Link to="/TotalSum">Logout</Link>
        </li>

        {/* Logout */}
        <li className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded-md mt-4">
          <FiLogOut />
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
