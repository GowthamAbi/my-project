import React, { useState } from "react";
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";

const IncomeReports = () => {
  const [refresh, setRefresh] = useState(false);

  const handleIncomeAdded = () => {
    setRefresh(!refresh); // Toggle state to trigger re-fetch
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Income Reports</h2>
      <IncomeForm onIncomeAdded={handleIncomeAdded} />
      <IncomeList key={refresh} />
    </div>
  );
};

export default IncomeReports;
