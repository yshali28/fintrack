import React, { useState, useEffect } from "react";
import ExpensePieChart from "../components/ExpensePieChart";
import CustomCalendar from "../components/Calendar";
import "../index.css";

const Dashboard = ({ user }) => {
  const [currentDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("weeklyExpenses")) || {};
    
    const formattedData = Object.keys(savedExpenses).map(category => ({
      name: category,
      value: Object.values(savedExpenses[category]).reduce((sum, amount) => sum + amount, 0),
    }));
    
    setChartData(formattedData);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back to your dashboard, {user?.name || "User"}!</h1>
        <h2>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
      </div>

      <div className="dashboard-content">
        <ExpensePieChart data={chartData} />
        <CustomCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
