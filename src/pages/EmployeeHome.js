import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ResignationCard from "../components/ResignationCard";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployeeHome = () => {
  const [resignation, setResignation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResignation = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const res = await axios.get(`/v1/employees/${userId}/resignation`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setResignation(res.data);
      } catch (err) {
        console.error("Error fetching resignation:", err);
      }
    };

    fetchResignation();
  }, []);

  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <h3>Your Resignation</h3>

        {resignation ? (
          <ResignationCard resignation={resignation} userRole="employee" />
        ) : (
          <>
            <p>No resignation found.</p>
            <button onClick={() => navigate("/submit-resignation")}>
              Submit Resignation
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default EmployeeHome;
