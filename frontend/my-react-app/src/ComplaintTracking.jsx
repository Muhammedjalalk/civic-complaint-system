


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TrackComplaint.css"; // Create this CSS file for custom styles

export default function TrackComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchComplaint();
    } else {
      setError("Invalid complaint ID");
      setLoading(false);
    }
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const res = await privateAPI.get(
        `/accounts/citizen/complaints/track/${id}/`
      );
      setComplaint(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "info";
      default: return "secondary";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved": return "success";
      case "in progress": return "primary";
      case "pending": return "warning";
      case "rejected": return "danger";
      default: return "secondary";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Fetching complaint details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5">
        <div className="error-card text-center p-5 shadow-sm">
          <div className="error-icon mb-4">
            <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: "4rem" }}></i>
          </div>
          <h4 className="text-danger mb-3">Oops! Something went wrong</h4>
          <p className="text-muted mb-4">{error}</p>
          <button className="btn btn-primary px-4" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
          <button className="btn btn-outline-primary ms-2 px-4" onClick={fetchComplaint}>
            <i className="bi bi-arrow-clockwise me-2"></i>Retry
          </button>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="container py-5 text-center">
        <div className="empty-state p-5">
          <i className="bi bi-search text-muted" style={{ fontSize: "4rem" }}></i>
          <h4 className="mt-3">No complaint found</h4>
          <p className="text-muted mb-4">The requested complaint does not exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-clipboard-check text-primary me-2"></i>
            Complaint Tracking
          </h2>
          <p className="text-muted">Track your complaint status and updates in real-time</p>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-1"></i>Back to List
        </button>
      </div>

      {/* Complaint Summary Card */}
      <div className="card summary-card shadow-lg border-0 mb-5">
        <div className="card-header bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                Complaint Summary
              </h5>
            </div>
            <div className="d-flex gap-2">
              <span className={`badge bg-${getPriorityColor(complaint.priority)}`}>
                <i className="bi bi-flag me-1"></i>
                {complaint.priority} Priority
              </span>
              <span className={`badge bg-${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="text-muted small mb-1">COMPLAINT ID</label>
                <h4 className="fw-bold text-primary">#{complaint.id}</h4>
              </div>
              <div className="mb-3">
                <label className="text-muted small mb-1">DATE SUBMITTED</label>
                <p className="fw-semibold">
                  <i className="bi bi-calendar3 me-2"></i>
                  {complaint.created_at ? new Date(complaint.created_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="text-muted small mb-1">CATEGORY</label>
                <p className="fw-semibold">
                  <i className="bi bi-tag me-2"></i>
                  {complaint.category || "General"}
                </p>
              </div>
              <div className="mb-3">
                <label className="text-muted small mb-1">LAST UPDATED</label>
                <p className="fw-semibold">
                  <i className="bi bi-clock-history me-2"></i>
                  {complaint.updated_at ? new Date(complaint.updated_at).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <label className="text-muted small mb-1">DESCRIPTION</label>
            <div className="description-box p-3 bg-light rounded">
              <p className="mb-0">{complaint.description}</p>
            </div>
          </div>

          {complaint.reply && (
            <div className="mt-4">
              <label className="text-muted small mb-1">OFFICIAL RESPONSE</label>
              <div className="response-box p-3 bg-info bg-opacity-10 border-start border-info border-3">
                <div className="d-flex align-items-start">
                  <i className="bi bi-chat-left-text text-info me-2 mt-1"></i>
                  <p className="mb-0 fw-medium">{complaint.reply}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="timeline-section mb-5">
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-timeline text-primary me-2" style={{ fontSize: "1.5rem" }}></i>
          <h4 className="fw-bold mb-0">Status History</h4>
        </div>

        {complaint.assignments && complaint.assignments.length > 0 ? (
          <div className="timeline">
            {complaint.assignments.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-marker">
                  <div className={`marker-dot ${index === 0 ? 'active' : ''}`}>
                    {index === 0 && <div className="inner-dot"></div>}
                  </div>
                  {index < complaint.assignments.length - 1 && (
                    <div className="timeline-line"></div>
                  )}
                </div>
                <div className="timeline-content card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h5 className="fw-bold mb-1">{item.status}</h5>
                        {item.assigned_to && (
                          <p className="text-muted small mb-1">
                            <i className="bi bi-person-badge me-1"></i>
                            Assigned to: {item.assigned_to}
                          </p>
                        )}
                      </div>
                      <small className="text-muted">
                        <i className="bi bi-clock me-1"></i>
                        {item.assigned_at ? new Date(item.assigned_at).toLocaleString() : ""}
                      </small>
                    </div>
                    
                    {item.remarks && (
                      <div className="remarks-box mt-2 p-2 bg-light rounded">
                        <p className="mb-0 small">
                          <i className="bi bi-chat-right-text me-1"></i>
                          {item.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-clock-history text-muted" style={{ fontSize: "3rem" }}></i>
            <h5 className="mt-3 text-muted">No updates yet</h5>
            <p className="text-muted">Your complaint is being reviewed. Check back later for updates.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between mt-5 pt-3 border-top">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={fetchComplaint}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
          >
            <i className="bi bi-printer me-2"></i>Print Summary
          </button>
        </div>
      </div>
    </div>
  );
}