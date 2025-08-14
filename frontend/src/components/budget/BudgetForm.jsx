import React, { useState } from 'react';

const BudgetForm = ({ userId, onBudgetSet }) => {
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/budget/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount: budget })
    });
    onBudgetSet(budget);
    setBudget('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-2">Set Monthly Budget</h3>
      <input
        type="number"
        placeholder="Enter amount"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default BudgetForm;
