import React, { useState, useEffect } from "react";
import "../index.css";

const Budget = ({ updateExpenseData }) => {
  const [budget, setBudget] = useState(50000);
  const [usedBudget, setUsedBudget] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);
  const [expenses, setExpenses] = useState({
    Groceries: [],
    Rent: [],
    Utilities: [],
    Transport: [],
    Healthcare: [],
    Entertainment: [],
  });

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setBudget(JSON.parse(savedBudget));

    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses);
      const completeExpenses = {
        Groceries: parsedExpenses.Groceries || [],
        Rent: parsedExpenses.Rent || [],
        Utilities: parsedExpenses.Utilities || [],
        Transport: parsedExpenses.Transport || [],
        Healthcare: parsedExpenses.Healthcare || [],
        Entertainment: parsedExpenses.Entertainment || [],
      };
      setExpenses(completeExpenses);
      calculateUsedBudget(completeExpenses);
    }
  }, []);

  const handleAddExpense = (category, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    const updatedExpenses = { ...expenses, [category]: [...expenses[category], Number(amount)] };
    setExpenses(updatedExpenses);
    calculateUsedBudget(updatedExpenses);
  };

  const handleDeleteExpense = (category, index) => {
    const updatedExpenses = { ...expenses };
    updatedExpenses[category].splice(index, 1);
    setExpenses(updatedExpenses);
    calculateUsedBudget(updatedExpenses);
  };

  const calculateUsedBudget = (expenses) => {
    const total = Object.values(expenses).reduce(
      (sum, entries) => sum + entries.reduce((a, b) => a + b, 0),
      0
    );
    setUsedBudget(total);
  };

  const saveBudgetAndExpenses = () => {
    localStorage.setItem("budget", JSON.stringify(budget));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateExpenseData(expenses);
    alert("Changes have been saved!");
  };

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h1>Monthly Budget</h1>
        <button className="edit-budget-btn" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Budget"}
        </button>
      </div>

      {isEditing && (
        <div className="edit-budget-container">
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="edit-budget-input"
          />
          <button
            onClick={() => {
              setBudget(Number(newBudget));
              setIsEditing(false);
            }}
            className="save-budget-btn"
          >
            Save Budget
          </button>
        </div>
      )}

      <div className="budget-progress-container">
        <div className="budget-progress-bar" style={{ width: `${(1 - usedBudget / budget) * 100}%` }}>
          ₹{budget - usedBudget} Left
        </div>
      </div>

      <div className="budget-grid">
        {Object.keys(expenses).map((category) => (
          <div key={category} className="budget-category">
            <h2>{category}</h2>
            <div className="expense-list">
              {expenses[category].length > 0 ? (
                expenses[category].map((amount, index) => (
                  <div key={index} className="expense-item">
                    ₹{amount}
                    <button className="delete-btn" onClick={() => handleDeleteExpense(category, index)}>
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-expense">No expenses yet</p>
              )}
            </div>
            <input
              type="number"
              placeholder="Enter amount"
              className="budget-input"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddExpense(category, e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              className="add-expense-btn"
              onClick={(e) => {
                const inputField = e.target.previousSibling;
                handleAddExpense(category, inputField.value);
                inputField.value = "";
              }}
            >
              Add Expense
            </button>
          </div>
        ))}
      </div>

      <button onClick={saveBudgetAndExpenses} className="save-changes-btn">
        Save All Changes
      </button>
    </div>
  );
};

export default Budget;

