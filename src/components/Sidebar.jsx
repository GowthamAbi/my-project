import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie, FaFileExport, FaMoneyBillWave, FaClipboardList, FaBullseye, FaWallet } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    // Listen for changes in authToken to update login state
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!isLoggedIn) return null; // Hide sidebar if user is not logged in

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 h-1000 bg-gray-900 text-white p-4 fixed left-0 top-18 ">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <button onClick={() => toggleSection("budget")} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <span className="flex items-center gap-2">
              <FaMoneyBillWave /> Budget
            </span>
            <span>{openSections.budget ? "▲" : "▼"}</span>
          </button>
          {openSections.budget && (
            <ul className="pl-6 space-y-1">
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budgetForm")}>From</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budgetList")}>List</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/budgetChart")}>Chart</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/exportdata")}>Export Data</li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => toggleSection("expense")} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <span className="flex items-center gap-2">
              <FaClipboardList /> Expense
            </span>
            <span>{openSections.expense ? "▲" : "▼"}</span>
          </button>
          {openSections.expense && (
            <ul className="pl-6 space-y-1">
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expenseRecording")}>Expense</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/list")}>List</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/chart")}>Chart</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/recurring")}>Recurring</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate("/expense/recurring-list")}>Recurring List</li>
            </ul>
          )}
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/goals")}>
          <FaBullseye /> Goals
        </li>
        <li>
          <button onClick={() => toggleSection("income")} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
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
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/financialReports")}>
          <FaChartPie /> All Reports
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate("/du-bill-list")}>
          <FaFileExport /> Due Bill List
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
