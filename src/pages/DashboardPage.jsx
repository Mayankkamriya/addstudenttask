import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "src/firebase/config"; // Adjust path to your Firebase config

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
