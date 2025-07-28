import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SubmitResignation = () => {
  const [reason, setReason] = useState("");
  const [preferredExitDate, setPreferredExitDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
  "/api/user/resign",
  { lwd: preferredExitDate },
  { headers: { Authorization: `Bearer ${token}` } }
);

      navigate("/employee");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Submit Resignation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reason:</label><br />
          <textarea
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>

        <div>
          <label>Preferred Exit Date:</label><br />
          <input
            type="date"
            required
            value={preferredExitDate}
            onChange={(e) => setPreferredExitDate(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Submit Resignation
        </button>
      </form>
    </div>
  );
};

export default SubmitResignation;
