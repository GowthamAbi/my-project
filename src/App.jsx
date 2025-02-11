import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Sidebar from "./components/Sidebar";
import NotificationBell from "./components/Navbar/NotificationBell";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import RecurringExpense from "./components/plans/Expense/ExpenseRecurring";
import BudgetForm from "./components/plans/Budget/BudgetForm";
import BudgetList from "./components/plans/Budget/BudgetList";
import BudgetChart from "./components/plans/Budget/BudgetChart";
import ExportData from "./components/plans/Budget/ExportData";
import FinancialReports from "./components/plans/Report/FinancialReports";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ExpenseRecording from "./components/plans/Expense/Expense";
import ExpenseList from "./components/plans/Expense/ExpenseList";
import ExpenseCategorization from "./components/plans/Expense/ExpenseCategorization";
import RecurringExpenseList from "./components/plans/Expense/RecurringExpenseList";
import FinancialGoals from "./components/plans/Goals/FinancialGoals";
import IncomeForm from "./components/plans/Income/IncomeForm";
import IncomeList from "./components/plans/Income/IncomeList";
import IncomeReports from "./components/plans/Income/IncomeReports";
import DueDatesList from "./components/plans/DueBillsList";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 p-4 ml-64">
            <NotificationBell />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recurringExpense" element={<RecurringExpense />} />
              <Route path="/budgetForm" element={<BudgetForm />} />
              <Route path="/budgetlist" element={<BudgetList />} /> 
              <Route path="/budgetChart" element={<BudgetChart />} /> 
              <Route path="/exportdata" element={<ExportData />} /> 
              <Route path="/expenseRecording" element={<ExpenseRecording />} /> ExpenseRecording
              <Route path="/expense/list" element={<ExpenseList />} />
              <Route path="/expense/chart" element={<ExpenseCategorization />} />
              <Route path="/expense/recurring" element={<RecurringExpense />} />
              <Route path="/expense/recurring-list" element={<RecurringExpenseList />} />
              <Route path="/goals" element={<FinancialGoals/>} />
              <Route path="/income/from" element={<IncomeForm/>} />
              <Route path="/income/list" element={<IncomeList/>} />
              <Route path="/income/report" element={<IncomeReports/>} />
              <Route path="/financialReports" element={<FinancialReports/>} />
              <Route path="/du-bill-list" element={<DueDatesList/>} />

            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
