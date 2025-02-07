import React from 'react';
import ExpenseRecording from '../plans/Expense/Expense'; // Path to ExpenseRecording component
import ExpenseCategorization from '../plans/Expense/ExpenseCategorization'; // Path to ExpenseCategorization component
import RecurringExpense from '../plans/Expense/ExpenseRecurring'; // Path to RecurringExpense component
import ExpenseList from '../plans/Expense/ExpenseList'; // Path to ExpenseRecording component
import RecurringExpenseList from '../plans/Expense/RecurringExpenseList';


const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Expense Tracking Dashboard</h1>
      
      {/* Expense Recording Section */}
      <section className="mb-8">
        <ExpenseRecording />
      </section>

      {/* Expense Recording Section */}
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
      
      {/* Recurring Expenses Section */}
      <section className="mb-8">
        <RecurringExpenseList />
      </section>
    </div>
  );
};

export default Dashboard;
