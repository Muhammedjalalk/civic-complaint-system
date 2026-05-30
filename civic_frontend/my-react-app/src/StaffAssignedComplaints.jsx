


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";

const StaffAssignedComplaints = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [pendingStatus, setPendingStatus] = useState({});
  const [remarks, setRemarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  const fetchAssignedComplaints = async () => {
    try {
      const res = await privateAPI.get("/accounts/staff/assigned-complaints/");
      console.log("API Response:", res.data);
      
      // Debug: Log each assignment's structure
      if (res.data && res.data.assigned_complaints) {
        res.data.assigned_complaints.forEach((assignment, index) => {
          console.log(`Assignment ${index}:`, assignment);
          console.log(`Complaint object ${index}:`, assignment.complaint);
          console.log(`Attachment path ${index}:`, assignment.complaint?.attachment);
          console.log(`Attachment URL ${index}:`, getAttachmentUrl(assignment.complaint?.attachment));
        });
        
        setAssignments(res.data.assigned_complaints);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error?.response?.data?.error || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get full attachment URL - SAME AS OfficerComplaintView
  const getAttachmentUrl = (attachment) => {
    if (!attachment) return null;
    
    // If it's already a full URL
    if (attachment.startsWith('http://') || attachment.startsWith('https://')) {
      return attachment;
    }
    
    // If it's a file path starting with /media/
    if (attachment.startsWith('/media/')) {
      return `http://127.0.0.1:8000${attachment}`;
    }
    
    // If it's just a filename, assume it's in media folder
    return `http://127.0.0.1:8000/media/${attachment}`;
  };

  // Logout function
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_info");
      
      delete privateAPI.defaults.headers.common["Authorization"];
      
      navigate("/login");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      navigate("/login");
    }
  };

  const updateStatus = async (assignmentId) => {
    const status = pendingStatus[assignmentId];
    if (!status) return;

    setUpdatingId(assignmentId);
    try {
      await privateAPI.patch("/accounts/staff/update-assignment-status/", {
        assignment_id: assignmentId,
        status,
      });

      setAssignments((prev) =>
        prev.map((a) =>
          a.assignment_id === assignmentId ? { ...a, status: status } : a
        )
      );

      setPendingStatus((prev) => {
        const copy = { ...prev };
        delete copy[assignmentId];
        return copy;
      });
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const returnToOfficer = async (assignmentId) => {
    const remark = remarks[assignmentId] || "";
    setUpdatingId(assignmentId);

    try {
      const res = await privateAPI.post("/accounts/staff/return-complaint/", {
        assignment_id: assignmentId,
        remarks: remark,
      });

      setAssignments((prev) =>
        prev.map((a) =>
          a.assignment_id === assignmentId
            ? { ...a, status: res.data.status }
            : a
        )
      );

      setRemarks((prev) => {
        const copy = { ...prev };
        delete copy[assignmentId];
        return copy;
      });
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to return complaint");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Assigned: "primary",
      "In Progress": "info",
      Resolved: "success",
      Rejected: "danger",
      Returned: "warning",
    };
    return <span className={`badge bg-${map[status] || "secondary"}`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const map = {
      High: "danger",
      Medium: "warning",
      Low: "info",
      Normal: "secondary",
    };
    return <span className={`badge bg-${map[priority] || "secondary"}`}>{priority}</span>;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p>Loading assigned complaints...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header with Logout Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">👷 My Assigned Complaints</h3>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
          Logout
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="alert alert-info">
          No complaints assigned to you.
        </div>
      ) : (
        <div className="row g-4">
          {assignments.map((a) => {
            const isClosed =
              a.status === "Resolved" || 
              a.status === "Rejected" || 
              a.status === "Returned";
            
            // Get the attachment URL
            const attachmentUrl = getAttachmentUrl(a.complaint?.attachment);

            return (
              <div key={a.assignment_id} className="col-md-6 col-lg-4">
                <div className="card shadow h-100">
                  <div className="card-header d-flex justify-content-between align-items-start">
                    <div>
                      <strong className="d-block">Complaint #{a.complaint?.id || "N/A"}</strong>
                      <small className="text-muted">Assignment ID: {a.assignment_id || "N/A"}</small>
                    </div>
                    {getStatusBadge(a.status)}
                  </div>

                  <div className="card-body">
                    {/* Departments Section */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <span className="text-muted small">📋 Departments:</span>
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {a.complaint?.departments?.length > 0 ? (
                          a.complaint.departments.map((dept, index) => (
                            <span 
                              key={index} 
                              className="badge bg-light text-dark border border-secondary"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {dept}
                            </span>
                          ))
                        ) : (
                          <span className="badge bg-light text-muted border">No departments</span>
                        )}
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted small">⚡ Priority:</span>
                        {getPriorityBadge(a.complaint?.priority)}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <span className="text-muted small me-2">📍</span>
                        <span className="text-muted small">Location:</span>
                      </div>
                      <p className="mb-0 small">{a.complaint?.location || "N/A"}</p>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-1">
                        <span className="text-muted small me-2">📝</span>
                        <span className="text-muted small">Description:</span>
                      </div>
                      <p className="mb-0 small text-muted" style={{ maxHeight: "60px", overflow: "auto" }}>
                        {a.complaint?.description || "No description provided"}
                      </p>
                    </div>

                    {/* ✅ CORRECTED ATTACHMENT SECTION - SAME AS OfficerComplaintView */}
                    <div className="mb-3">
                      <div className="field-label">Attachment:</div>
                      <div className="field-value">
                        {attachmentUrl ? (
                          <a
                            href={attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              background: '#ebf8ff',
                              color: '#3182ce',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}
                          >
                            <i className="bi bi-eye"></i>
                            View File
                          </a>
                        ) : "None"}
                      </div>
                    </div>

                    {/* Status Update Section */}
                    <div className="border-top pt-3">
                      <div className="mb-2">
                        <small className="text-muted d-block mb-1">Update Status:</small>
                        <select
                          className="form-select form-select-sm"
                          disabled={isClosed}
                          value={pendingStatus[a.assignment_id] ?? a.status}
                          onChange={(e) =>
                            setPendingStatus({
                              ...pendingStatus,
                              [a.assignment_id]: e.target.value,
                            })
                          }
                        >
                          <option value="Assigned">Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-success btn-sm w-100 mb-2"
                        disabled={
                          isClosed ||
                          updatingId === a.assignment_id ||
                          pendingStatus[a.assignment_id] === a.status
                        }
                        onClick={() => updateStatus(a.assignment_id)}
                      >
                        {updatingId === a.assignment_id
                          ? <span className="spinner-border spinner-border-sm me-1"></span>
                          : null}
                        {updatingId === a.assignment_id ? "Updating..." : "Update Status"}
                      </button>

                      {/* Return to Officer */}
                      {!isClosed && (
                        <div className="mb-2">
                          <small className="text-muted d-block mb-1">Return to Officer:</small>
                          <textarea
                            className="form-control form-control-sm mb-1"
                            placeholder="Add remarks (optional)"
                            value={remarks[a.assignment_id] || ""}
                            onChange={(e) =>
                              setRemarks({
                                ...remarks,
                                [a.assignment_id]: e.target.value,
                              })
                            }
                            rows="2"
                          />
                          <button
                            className="btn btn-warning btn-sm w-100"
                            disabled={updatingId === a.assignment_id}
                            onClick={() => returnToOfficer(a.assignment_id)}
                          >
                            {updatingId === a.assignment_id
                              ? <span className="spinner-border spinner-border-sm me-1"></span>
                              : null}
                            {updatingId === a.assignment_id ? "Returning..." : "Return to Officer"}
                          </button>
                        </div>
                      )}

                      {isClosed && (
                        <div className="alert alert-secondary mt-2 py-1 small text-center">
                          <span className="me-1">🔒</span>
                          This complaint is closed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add CSS for field-label like in OfficerComplaintView */}
      <style jsx>{`
        .field-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .field-value {
          color: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default StaffAssignedComplaints;