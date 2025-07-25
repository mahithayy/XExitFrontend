// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "#e53935",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
