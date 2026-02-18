// src/pages/QueryHistory.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axios";




export default function QueryHistory() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await axiosInstance.get("/citizen/queries/history/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setQueries(res.data);
      } catch (err) {
        console.error(err.response || err);
        alert("Failed to load query history.");
      } finally {
        setLoading(false);
      }
    }

    fetchQueries();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Query History</h2>
      {queries.length === 0 ? (
        <p>No queries submitted yet.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Message</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id}>
                <td>{q.subject}</td>
                <td>{q.message}</td>
                <td>{new Date(q.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
