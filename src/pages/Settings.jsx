import React, { useState, useEffect } from "react";
import "../index.css";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (savedUser.name) setUsername(savedUser.name);
    if (savedUser.email) setEmail(savedUser.email);
  }, []);

  const handleUsernameChange = () => {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    let loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    loggedUser.name = username;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

    setIsEditingUsername(false);
    alert("Username updated successfully!");
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    if (currentPassword !== loggedUser.password) {
      alert("Current password is incorrect!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    loggedUser.password = newPassword;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
    alert("Password updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="settings-section">
        <p><strong>Email:</strong> {email}</p>
      </div>

      <div className="settings-section">
        <p><strong>Username:</strong> {isEditingUsername ? (
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="settings-input"
          />
        ) : (
          username
        )}</p>

        {isEditingUsername ? (
          <button onClick={handleUsernameChange} className="settings-btn">Save</button>
        ) : (
          <button onClick={() => setIsEditingUsername(true)} className="settings-btn">Edit</button>
        )}
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        {isEditingPassword ? (
          <>
            <input 
              type="password" 
              placeholder="Current Password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              className="settings-input"
            />
            <input 
              type="password" 
              placeholder="New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="settings-input"
            />
            <input 
              type="password" 
              placeholder="Confirm New Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="settings-input"
            />
            <button onClick={handlePasswordChange} className="settings-btn">Save</button>
          </>
        ) : (
          <button onClick={() => setIsEditingPassword(true)} className="settings-btn">Change Password</button>
        )}
      </div>
    </div>
  );
};

export default Settings;



