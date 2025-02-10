import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaList, FaFileExport, FaMoneyBillWave, FaClipboardList, FaBullseye, FaWallet } from 'react-icons/fa';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState({});

  // Toggle collapse
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    
   <div className="w-64 h-screen bg-gray-900 text-white p-4">
             <h2 className="text-xl font-bold mb-4">Dashboard</h2>
             <ul className="space-y-2">
               
               {/* Budget Section */}
               <li>
                 <button onClick={() => toggleSection('budget')} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                   <span className="flex items-center gap-2">
                     <FaMoneyBillWave /> Budget
                   </span>
                   <span>{openSections.budget ? '▲' : '▼'}</span>
                 </button>
                 {openSections.budget && (
                   <ul className="pl-6 space-y-1">
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/budget/from')}>From</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/budget/list')}>List</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/budget/chart')}>Chart</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/budget/exportdata')}>Export Data</li>
                   </ul>
                 )}
               </li>
       
               {/* Expense Section */}
               <li>
                 <button onClick={() => toggleSection('expense')} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                   <span className="flex items-center gap-2">
                     <FaClipboardList /> Expense
                   </span>
                   <span>{openSections.expense ? '▲' : '▼'}</span>
                 </button>
                 {openSections.expense && (
                   <ul className="pl-6 space-y-1">
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/expense/expense')}>Expense</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/expense/list')}>List</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/expense/chart')}>Chart</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/expense/recurring')}>Recurring</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/expense/recurring-list')}>Recurring List</li>
                   </ul>
                 )}
               </li>
       
               {/* Goals */}
               <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate('/goals')}>
                 <FaBullseye /> Goals
               </li>
       
               {/* Income Section */}
               <li>
                 <button onClick={() => toggleSection('income')} className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                   <span className="flex items-center gap-2">
                     <FaWallet /> Income
                   </span>
                   <span>{openSections.income ? '▲' : '▼'}</span>
                 </button>
                 {openSections.income && (
                   <ul className="pl-6 space-y-1">
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/income/from')}>From</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/income/list')}>List</li>
                     <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => navigate('/income/report')}>Report</li>
                   </ul>
                 )}
               </li>
       
               {/* All Reports */}
               <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate('/reports')}>
                 <FaChartPie /> All Reports
               </li>
       
               {/* Due Bill List */}
               <li className="hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-2" onClick={() => navigate('/du-bill-list')}>
                 <FaFileExport /> Due Bill List
               </li>
       
             </ul>
           </div>
  );
};

export default DashboardSidebar;
