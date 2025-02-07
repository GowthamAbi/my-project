import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { saveAs } from "file-saver";
import Papa from "papaparse";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FinancialGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");

  useEffect(() => {
    // Load stored goals (mocking API response)
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(savedGoals);
  }, []);

  const addGoal = () => {
    if (!goalName || !targetAmount) return;
    const newGoal = { goalName, targetAmount: Number(targetAmount), currentSavings: Number(currentSavings) };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoalName("");
    setTargetAmount("");
    setCurrentSavings("");
  };

  /*const exportPDF = async () => {
    // Import dynamically to prevent externalization issues
    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;
  
    // Set the virtual file system
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
    // Define the PDF document
    const docDefinition = {
      content: [{ text: "Financial Goals Report", style: "header" }],
    };
  
    // Generate and download the PDF
    pdfMake.createPdf(docDefinition).download("financial_goals.pdf");
  };*/
  
  

  const exportCSV = () => {
    const csv = Papa.unparse(goals); // Convert JSON to CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "financial_goals.csv");
  };
  

  const data = {
    labels: goals.map(g => g.goalName),
    datasets: [
      { label: "Current Savings", data: goals.map(g => g.currentSavings), backgroundColor: "#4ade80" },
      { label: "Target Amount", data: goals.map(g => g.targetAmount), backgroundColor: "#f43f5e" }
    ]
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Financial Goals Tracker</h2>
      <div className="my-4">
        <input className="border p-2 mr-2" type="text" placeholder="Goal Name" value={goalName} onChange={e => setGoalName(e.target.value)} />
        <input className="border p-2 mr-2" type="number" placeholder="Target Amount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} />
        <input className="border p-2 mr-2" type="number" placeholder="Current Savings" value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addGoal}>Add Goal</button>
      </div>
      <Bar data={data} />
      <div className="mt-4 flex space-x-2">
       {/* <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={exportPDF}>Download PDF</button>*/}
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={exportCSV}>Download CSV</button>
      </div>
    </div>
  );
};

export default FinancialGoals;
