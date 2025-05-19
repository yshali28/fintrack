import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../index.css';

const ExpensePieChart = ({ data }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="chart-container">
      <h2>Expense Breakdown</h2>
      <p className="chart-subtitle">Track where your money is going!</p>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
        <Pie
          data={data.length > 0 ? data : [{ name: "No Data", value: 1 }]} // Prevent empty array issues
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={40}
          paddingAngle={2}
          dataKey="value"
        >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="white"
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`₹${value.toFixed(2)}`, name]} // Tooltip shows "Category: ₹Amount"
          />
        </PieChart>
        <br></br>
        <p className="chart-summary">
          Total Expenses: <span className="highlight">₹{data.reduce((acc, curr) => acc + curr.value, 0)}</span>
        </p>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
