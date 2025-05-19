import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="header1">
      <h1>FinTrack</h1>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        
        {!user && (
          <>
            <li><NavLink to="/signup" className={({ isActive }) => isActive ? "active" : ""}>Sign Up</NavLink></li>
            <li><NavLink to="/signin" className={({ isActive }) => isActive ? "active" : ""}>Sign In</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;




