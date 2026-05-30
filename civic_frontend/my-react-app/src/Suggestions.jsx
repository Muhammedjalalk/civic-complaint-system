import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CitizenSuggestionForm({ complaintId = null, token }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  /* ---------------- FETCH DEPARTMENTS ---------------- */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        let url = "/accounts/departments/";

        // ✅ If complaint exists → fetch complaint departments only
        if (complaintId) {
          url = `/accounts/complaints/${complaintId}/departments/`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setDepartments(data);
      } catch (err) {
        console.error(err);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, [token, complaintId]);

  /* ---------------- SUBMIT SUGGESTION ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!departmentId) {
      setMessage("Please select a department");
      return;
    }

    try {
      const payload = {
        department: departmentId,
        subject,
        description,
      };

      // ✅ complaint is optional
      if (complaintId) {
        payload.complaint = complaintId;
      }

      const res = await axios.post(
        "/accounts/citizen/suggestions/create/",
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Suggestion sent successfully");
      setSubject("");
      setDescription("");
      setDepartmentId("");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.detail ||
          "Something went wrong. Please try again."
      );
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ border: "1px solid gray", padding: "15px", marginTop: "20px" }}>
      <h3>Send a Suggestion (Optional)</h3>

      {complaintId && (
        <p style={{ color: "gray" }}>
          Linked to Complaint ID: <b>{complaintId}</b>
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Department:</label>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.parent
                  ? `${dept.parent.name} → ${dept.name}`
                  : dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Send Suggestion
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
