// src/pages/SuggestionHistory.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axios";



export default function SuggestionHistory() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const res = await axiosInstance.get("/citizen/suggestions/history/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error(err.response || err);
        alert("Failed to load suggestion history.");
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Suggestion History</h2>
      {suggestions.length === 0 ? (
        <p>No suggestions submitted yet.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Message</th>
              <th>Attachment</th>
              <th>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((s) => (
              <tr key={s.id}>
                <td>{s.message}</td>
                <td>
                  {s.attachment ? (
                    <a href={s.attachment} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    "None"
                  )}
                </td>
                <td>{new Date(s.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
