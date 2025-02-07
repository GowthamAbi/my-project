import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../../../services/api";

// Register required components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BudgetChart = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend API
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get("/api/budgets"); // 🔹 Update with your backend API
        console.log("API Response:", response.data);
        setBudgets(response.data);
      } catch (err) {
        console.error("Error fetching budget data:", err);
        setError("Failed to fetch budget data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) return <p>Loading budget data...</p>;
  if (error) return <p>{error}</p>;
  if (!budgets || budgets.length === 0) return <p>No budget data available</p>;

  // Chart data
  const data = {
    labels: budgets.map((b) => b.category),
    datasets: [
      {
        label: "Budget",
        data: budgets.map((b) => b.amount),
        backgroundColor: "blue",
      },
      {
        label: "Spent",
        data: budgets.map((b) => b.spent),
        backgroundColor: "red",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Budget vs Spent" },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BudgetChart;
