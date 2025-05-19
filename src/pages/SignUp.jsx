import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some((user) => user.email === email)) {
      alert("User already exists! Try signing in.");
      return;
    }

    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    alert("Sign-up successful!.");
    navigate("/signin");
  };

  return (
    <div className="body">
      <main className="signup-container">
        <div className="signup-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleSignUp}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" required />

            <button type="submit" className="signup-button">Register</button>
          </form>
          <p>Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
