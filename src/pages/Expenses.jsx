import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "../index.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState({
    Groceries: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
    Rent: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
    Utilities: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
    Transport: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
    Healthcare: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
    Entertainment: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
  });

  useEffect(() => {
    const savedExpenses = localStorage.getItem("weeklyExpenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  const handleExpenseChange = (category, day, value) => {
    setExpenses((prev) => ({
      ...prev,
      [category]: { ...prev[category], [day]: Number(value) || 0 },
    }));
  };

  const saveExpenses = () => {
    localStorage.setItem("weeklyExpenses", JSON.stringify(expenses));
    alert("Changes have been saved!");
  };

  const getTotalExpense = (category) =>
    Object.values(expenses[category]).reduce((sum, amount) => sum + amount, 0);

  const COLORS = ["#FF5733", "#33FF57", "#3380FF", "#FFC300", "#A833FF", "#FF33A8", "#33FFD6"];

  return (
    <div className="expenses-container">
      <h1>Weekly Expense Tracker</h1>

      <div className="expenses-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              {Object.keys(expenses.Groceries).map((day) => (
                <th key={day}>{day}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(expenses).map((category) => (
              <tr key={category}>
                <td>{category}</td>
                {Object.keys(expenses[category]).map((day) => (
                  <td key={day}>
                    <input
                      type="number"
                      value={expenses[category][day]}
                      onChange={(e) => handleExpenseChange(category, day, e.target.value)}
                      className="expense-input"
                    />
                  </td>
                ))}
                <td className="total-expense">₹{getTotalExpense(category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pie-charts-container">
        {Object.keys(expenses).map((category, index) => {
          const dailyData = Object.entries(expenses[category])
            .map(([day, value]) => ({ name: day, value }))
            .filter((entry) => entry.value > 0);

          return (
            dailyData.length > 0 && (
              <div className="category-chart" key={category}>
                <h3>{category} Expenses</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={dailyData} cx="50%" cy="50%" outerRadius={70} paddingAngle={2} dataKey="value" label>
                      {dailyData.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i]} stroke="white" />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`₹${value.toFixed(2)}`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )
          );
        })}
      </div>

      <button onClick={saveExpenses} className="save-changes-btn">
        Save All Changes
      </button>
    </div>
  );
};

export default Expenses;




