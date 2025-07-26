import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // was email
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/v1/auth/login", {
        username,
        password,
        role,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userId", user._id);

      if (user.role === "hr") {
        navigate("/hr");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container">
      <h2>Login to XExit</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div>
          <label>Login as: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
