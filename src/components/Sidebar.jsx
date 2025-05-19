import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2>FinTrack</h2>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active-link">🏠 Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/budget" activeClassName="active-link">💰 Budget</NavLink>
        </li>
        <li>
          <NavLink to="/expenses" activeClassName="active-link">📊 Expenses</NavLink>
        </li>
        <li>
          <NavLink to="/savings" activeClassName="active-link">🎯 Savings</NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active-link">⚙️ Settings</NavLink>
        </li>
      </ul>
      <button className="logout-btn" onClick={() => { onLogout(); navigate("/signin"); }}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;


