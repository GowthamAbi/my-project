import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import api from "../../../services/api";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const FinancialReports = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expenseRes, budgetRes, incomeRes] = await Promise.all([
        api.get("/api/expenses"),
        api.get("/api/budgets"),
        api.get("/api/reports"),
      ]);

      setExpenses(Array.isArray(expenseRes.data) ? expenseRes.data : []);
      setBudgets(Array.isArray(budgetRes.data) ? budgetRes.data : []);
      setIncome(Array.isArray(incomeRes.data) ? incomeRes.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // CSV Export Function
  const exportToCSV = () => {
    const data = [...expenses, ...budgets, ...income];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Reports");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(dataBlob, "Financial_Reports.xlsx");
  };

  if (loading) return <p>Loading financial data...</p>;

  return (
    <div className="container ml-4 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Financial Reports</h2>

      {/* Expense Report (Pie Chart) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Expense Breakdown</h3>
        {expenses.length > 0 ? (
          <Pie
            data={{
              labels: expenses.map((e) => e.category),
              datasets: [{ data: expenses.map((e) => e.amount), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }],
            }}
          />
        ) : (
          <p>No expense data available.</p>
        )}
      </div>

      {/* Budget Report (Bar Chart) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Budget vs. Actual Spending</h3>
        {budgets.length > 0 && expenses.length > 0 ? (
          <Bar
            data={{
              labels: budgets.map((b) => b.category),
              datasets: [
                { label: "Budget", data: budgets.map((b) => b.amount), backgroundColor: "rgba(75, 192, 192, 0.6)" },
                { label: "Actual Spending", data: expenses.map((e) => e.amount), backgroundColor: "rgba(255, 99, 132, 0.6)" },
              ],
            }}
          />
        ) : (
          <p>No budget data available.</p>
        )}
      </div>

      {/* Income Report (Line Chart) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Income Trend</h3>
        {income.length > 0 ? (
          <Line
            data={{
              labels: income.map((i) => i.date),
              datasets: [{ label: "Income", data: income.map((i) => i.amount), borderColor: "rgba(54, 162, 235, 1)", fill: false }],
            }}
          />
        ) : (
          <p>No income data available.</p>
        )}
      </div>

      {/* Export Button */}
      <button onClick={exportToCSV} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Export to CSV
      </button>
    </div>
  );
};

export default FinancialReports;
