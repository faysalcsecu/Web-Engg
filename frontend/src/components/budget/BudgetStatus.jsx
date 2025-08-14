import React, { useEffect, useState } from 'react';

const BudgetStatus = ({ userId }) => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    fetch(`/budget/status/${userId}`)
      .then(res => res.json())
      .then(data => {
        setBudget(data.budget);
        setSpent(data.spent);
      });
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h3 className="text-lg font-bold">Budget Status</h3>
      <p>Spent: {spent} / {budget}</p>
      <progress value={spent} max={budget} className="w-full"></progress>
      {spent >= budget && (
        <p className="text-red-500 font-bold mt-2">⚠ Budget limit reached!</p>
      )}
    </div>
  );
};

export default BudgetStatus;
