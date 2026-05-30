

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PendingStaffList() {
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState("");

  // Fetch pending staff from backend
  useEffect(() => {
    fetchPendingStaff();
  }, []);

  const fetchPendingStaff = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/accounts/officer/staff-list/",
        { withCredentials: true } // use if backend requires session auth
      );
      setStaffList(response.data.pending_staff);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch pending staff.");
    }
  };

  // Approve or Reject handler
  const handleStatusUpdate = async (staffId, status) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/officer/staff/${staffId}/update-status/`,
        { status },
        { withCredentials: true } // use if backend requires session auth
      );

      // Remove staff from the list after approving/rejecting
      setStaffList(prevList => prevList.filter(staff => staff.id !== staffId));
    } catch (err) {
      setError(
        err.response?.data?.error ||
        `Failed to ${status.toLowerCase()} staff.`
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Pending Staff Approval</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {staffList.length === 0 ? (
        <p>No pending staff requests.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>License</th>
              <th>Department</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff.id}>
                <td>{staff.full_name}</td>
                <td>{staff.email}</td>
                <td>{staff.phone}</td>
                <td>{staff.license_number}</td>
                <td>{staff.department}</td>
                <td>{staff.address}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleStatusUpdate(staff.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleStatusUpdate(staff.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
