import React from "react";
//import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const userRole = localStorage.getItem("userRole") || "employee";

  return (
    <header
      style={{
        padding: "1rem",
        background: "#0d47a1",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>XExit - {userRole === "hr" ? "HR Dashboard" : "Employee Portal"}</h2>
      <LogoutButton />
    </header>
  );
};

export default Header;
