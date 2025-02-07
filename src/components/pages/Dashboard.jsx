//Dashboard.jsx

import React from 'react';
import ExpenseRecording from '../plans/Expense/Expense'; // Path to ExpenseRecording component
import ExpenseCategorization from '../plans/Expense/ExpenseCategorization'; // Path to ExpenseCategorization component
import RecurringExpense from '../plans/Expense/ExpenseRecurring'; // Path to RecurringExpense component
import ExpenseList from '../plans/Expense/ExpenseList'; // Path to ExpenseRecording component
import RecurringExpenseList from '../plans/Expense/RecurringExpenseList';
import BudgetForm from '../plans/Budget/BudgetForm';
import BudgetChart from '../plans/Budget/BudgetChart';
import FinancialGoals from '../plans/Goals/FinancialGoals';
import FinancialReports from '../plans/Report/FinancialReports';
import IncomeForm from '../plans/Income/IncomeForm';
import IncomeList from '../plans/Income/IncomeList';
import IncomeReports from '../plans/Income/IncomeReports';


const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 dark:bg-gray-900"><div>
      <h1 className="text-3xl font-bold text-center mb-8">Expense Tracking Dashboard</h1>
      
      {/* Expense Recording Section */}
      <section className="mb-8">
        <ExpenseRecording />
      </section>

      {/* Expense Recording List Section */}
      <section className="mb-8">
        <ExpenseList />
      </section>

      {/* Expense Categorization Section with Charts */}
      <section className="mb-8">
        <ExpenseCategorization />
      </section>

      {/* Recurring Expenses Section */}
      <section className="mb-8">
        <RecurringExpense />
      </section>
      
      {/* Recurring Expenses List Section */}
      <section className="mb-8">
        <RecurringExpenseList />
      </section>
      </div>
      <div>
      <h1 className="text-3xl font-bold text-center mb-8">Budget</h1>
            
      {/* BudgetForm Section */}
      <section className="mb-8">
        <BudgetForm />
      </section>

      {/* BudgetChart Section */}
      <section className="mb-8">
        <BudgetChart />
      </section>
      </div>
     {/* Goals Section */}
      <div>
        <FinancialGoals />
      </div>
           {/* Report Section */}
           <div>
        <FinancialReports />
      </div>

      <div>
        <IncomeReports/>
      </div>
    </div>
  );
};

export default Dashboard;
