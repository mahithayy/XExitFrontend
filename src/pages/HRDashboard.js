import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ResignationCard from "../components/ResignationCard";
import axios from "../api/axios";

const HRDashboard = () => {
  const [resignations, setResignations] = useState([]);

  const fetchAllResignations = async () => {
    try {
      const res = await axios.get("/v1/hr/resignations");
      setResignations(res.data);
    } catch (err) {
      console.error("Error fetching resignations:", err);
    }
  };

  useEffect(() => {
    fetchAllResignations();
  }, []);

  const handleAction = async (resignationId, action) => {
    try {
      await axios.put(`/v1/hr/resignations/${resignationId}/${action}`); // /approve or /reject
      fetchAllResignations(); // Refresh data after update
    } catch (err) {
      console.error(`Failed to ${action}:`, err);
    }
  };

  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <h3>All Resignations</h3>
        {resignations.length > 0 ? (
          resignations.map((r) => (
            <ResignationCard
              key={r._id}
              resignation={r}
              userRole="hr"
              onAction={handleAction}
            />
          ))
        ) : (
          <p>No resignations to show.</p>
        )}
      </main>
    </>
  );
};

export default HRDashboard;
