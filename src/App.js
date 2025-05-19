import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Savings from "./pages/Savings"; 
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState(null);

  const [budget, setBudget] = useState(() => {
    return localStorage.getItem("budget") ? JSON.parse(localStorage.getItem("budget")) : 50000;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenseData"));
    return savedExpenses || {
      Groceries: [],
      Rent: [],
      Utilities: [],
      Transport: [],
      Healthcare: [],
      Entertainment: [],
    };
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const updateExpenseData = (category, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) return;
  
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: [...(prevExpenses[category] || []), Number(amount)],
    }));
  };  

  const ProtectedLayout = ({ children }) => {
    if (!user) return <Navigate to="/signin" replace />;
    
    return (
      <div>
        <Sidebar onLogout={handleLogout} />
        <div className="content">{children}</div>
      </div>
    );
  };

  return (
    <Router>
      {!user && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />

        <Route 
          path="/dashboard" 
          element={<ProtectedLayout><Dashboard user={user} expenseData={expenses} /></ProtectedLayout>} 
        />
        <Route 
          path="/budget" 
          element={<ProtectedLayout><Budget budget={budget} setBudget={setBudget} expenses={expenses} updateExpenseData={updateExpenseData} /></ProtectedLayout>} 
        />
        <Route path="/expenses" element={<ProtectedLayout><Expenses /></ProtectedLayout>} />
        <Route path="/savings" element={<ProtectedLayout><Savings /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><Settings /></ProtectedLayout>} />
      </Routes>

      {!user && <Footer />}
    </Router>
  );
}

export default App;
