import { useState, useEffect } from "react";
import Papa from "papaparse";
import api from "../../../services/api"; // ✅ Axios instance with token handling

const ExportData = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from backend using Axios
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/budgets"); // ✅ Ensure correct API endpoint
      console.log("API Response:", response.data); // ✅ Log API response for debugging

      if (Array.isArray(response.data) && response.data.length > 0) {
        setBudgets(response.data);
      } else {
        console.warn("No budget data available.");
        setBudgets([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Function to export CSV
  const exportCSV = async () => {
    try {
      // ✅ Ensure latest data is fetched before exporting
      await fetchData();
      if (!Array.isArray(budgets) || budgets.length === 0) {
        alert("No budget data available to export.");
        return;
      }

      console.log("Exporting Data:", budgets); // ✅ Log data before exporting

      const csv = Papa.unparse(budgets, {
        header: true, // ✅ Ensures column headers
      });

      // ✅ Create CSV Blob and trigger download
      const blob = new Blob([csv], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "budget_data.csv";
      a.click();
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Budget Data</h2>

      {loading ? (
        <p>Loading data...</p>
      ) : budgets.length === 0 ? (
        <p>No budget data available.</p>
      ) : (
        <button
          onClick={exportCSV}
          className="bg-green-500 text-white p-2 mt-4 rounded-md shadow-md hover:bg-green-600"
        >
          Export CSV
        </button>
      )}
    </div>
  );
};

export default ExportData;
