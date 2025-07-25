import React, { useState } from "react";
import axios from "../api/axios";

const ResignationCard = ({ resignation, userRole }) => {
  const [exitDate, setExitDate] = useState("");
  const [status, setStatus] = useState(resignation.status);

  const token = localStorage.getItem("token");

  const handleApprove = async () => {
    try {
      await axios.post(
        `/v1/hr/resignations/${resignation._id}/approve`,
        { exitDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("Approved");
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(
        `/v1/hr/resignations/${resignation._id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("Rejected");
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  const handleCancel = async () => {
    try {
      await axios.delete(`/v1/employees/resignations/${resignation._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        background: "#f9f9f9",
      }}
    >
      <h4>{resignation.employeeName}</h4>
      <p><strong>Reason:</strong> {resignation.reason}</p>
      <p><strong>Status:</strong> {status}</p>
      {resignation.exitDate && (
        <p><strong>Exit Date:</strong> {new Date(resignation.exitDate).toDateString()}</p>
      )}

      {userRole === "hr" && status === "Pending" && (
        <>
          <div style={{ marginTop: "0.5rem" }}>
            <label>
              Exit Date:{" "}
              <input
                type="date"
                value={exitDate}
                onChange={(e) => setExitDate(e.target.value)}
              />
            </label>
          </div>
          <button onClick={handleApprove} style={{ margin: "0.5rem" }}>
            Approve
          </button>
          <button onClick={handleReject} style={{ margin: "0.5rem" }}>
            Reject
          </button>
        </>
      )}

      {userRole === "employee" && status === "Pending" && (
        <button onClick={handleCancel} style={{ marginTop: "0.5rem" }}>
          Cancel Resignation
        </button>
      )}
    </div>
  );
};

export default ResignationCard;
