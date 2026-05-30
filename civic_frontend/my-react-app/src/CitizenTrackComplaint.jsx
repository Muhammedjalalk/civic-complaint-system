import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CitizenTrackComplaint() {
  const { complaintId } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const res = await privateAPI.get(
        `/citizen/complaints/${complaintId}/track/`
      );
      setComplaint(res.data);
    } catch (error) {
      console.error("Error fetching complaint", error);
      alert("Unable to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "badge bg-secondary";
      case "In Progress":
        return "badge bg-warning text-dark";
      case "Resolved":
        return "badge bg-success";
      case "Rejected":
        return "badge bg-danger";
      default:
        return "badge bg-dark";
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!complaint) {
    return <div className="text-center mt-5">No complaint found</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Track Complaint</h5>
        </div>

        <div className="card-body">
          <p>
            <strong>Complaint ID:</strong> #{complaint.id}
          </p>
          <p>
            <strong>Priority:</strong> {complaint.priority}
          </p>
          <p>
            <strong>Location:</strong> {complaint.location}
          </p>
          <p>
            <strong>Description:</strong> {complaint.description}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className={getStatusBadge(complaint.status)}>
              {complaint.status}
            </span>
          </p>

          <hr />

          <h6>Status Timeline</h6>
          {complaint.timeline && complaint.timeline.length > 0 ? (
            <ul className="list-group">
              {complaint.timeline.map((item, index) => (
                <li key={index} className="list-group-item">
                  <strong>{item.label}</strong>
                  <br />
                  <small className="text-muted">
                    {new Date(item.date).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No updates yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
