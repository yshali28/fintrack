import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../index.css";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard", { replace: true });
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="body">
      <main className="signin-container">
        <div className="signin-box">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="#">Forgot Password?</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
