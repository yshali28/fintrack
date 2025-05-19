import React, { useState, useEffect } from "react";
import "../index.css";

const Savings = () => {
  const [categories, setCategories] = useState([
    { name: "House", saved: 0, goal: 30000, isEditing: false },
    { name: "Car", saved: 0, goal: 50000, isEditing: false },
    { name: "Travel", saved: 0, goal: 20000, isEditing: false },
  ]);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("savingsCategories"));
    if (savedCategories) setCategories(savedCategories);
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const toggleEdit = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isEditing = !updatedCategories[index].isEditing;
    setCategories(updatedCategories);
  };

  const saveChanges = () => {
    const updatedCategories = categories.map(cat => ({ ...cat, isEditing: false }));
    setCategories(updatedCategories);
    localStorage.setItem("savingsCategories", JSON.stringify(updatedCategories));
    alert("Savings data saved!");
  };

  const totalSaved = categories.reduce((sum, cat) => sum + Number(cat.saved), 0);
  const totalGoal = categories.reduce((sum, cat) => sum + Number(cat.goal), 0);
  const overallProgress = totalGoal > 0 ? (totalSaved / totalGoal) * 100 : 0;

  return (
    <div className="savings-container">
      <h1>Track Your Savings</h1>

      <div className="savings-grid">
        {categories.map((category, index) => (
          <div key={index} className="savings-card">
            {category.isEditing ? (
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                className="edit-name-input"
              />
            ) : (
              <h3>{category.name}</h3>
            )}

            <p>Goal: ₹ 
              {category.isEditing ? (
                <input
                  type="number"
                  value={category.goal}
                  onChange={(e) => handleInputChange(index, "goal", e.target.value)}
                  className="edit-goal-input"
                />
              ) : (
                category.goal
              )}
            </p>

            <p>Saved: ₹{category.saved}</p>
            <input
              type="number"
              value={category.saved}
              onChange={(e) => handleInputChange(index, "saved", Number(e.target.value))}
              className="savings-input"
            />

            <button className="edit-btn" onClick={() => toggleEdit(index)}>
              {category.isEditing ? "Save" : "Edit"}
            </button>
          </div>
        ))}
      </div>

      <div className="total-progress">
        <h2>Total Savings Progress</h2>
        <div className="progress-bar large">
          <div
            className="progress"
            style={{
              width: `${overallProgress}%`,
            }}
          ></div>
        </div>
        <p>{totalSaved} / {totalGoal} saved</p>
      </div>

      <button className="save-btn" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default Savings;


