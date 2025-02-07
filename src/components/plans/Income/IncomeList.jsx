import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../services/api";

const IncomeList = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const response = await api.get("/api/income");
      setIncome(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Income List</h2>
      {loading ? (
        <p>Loading income data...</p>
      ) : income.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Source</th>
              <th className="border px-4 py-2">Amount ($)</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {income.map((inc, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{inc.source}</td>
                <td className="border px-4 py-2">${inc.amount}</td>
                <td className="border px-4 py-2">{new Date(inc.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No income data available.</p>
      )}
    </div>
  );
};

export default IncomeList;
