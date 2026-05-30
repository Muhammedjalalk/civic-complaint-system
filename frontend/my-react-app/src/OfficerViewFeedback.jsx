import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OfficerViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await privateAPI.get("/accounts/officer/feedback_view/");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((i) => (
          <i
            key={i}
            className={`bi ${
              i <= rating ? "bi-star-fill text-warning" : "bi-star text-muted"
            } me-1`}
          ></i>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mb-3"></div>
        <h5>Loading Feedbacks...</h5>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-chat-left-dots text-muted" style={{ fontSize: "4rem" }}></i>
        <h4 className="mt-3 text-muted">No Feedback Available</h4>
        <p className="text-muted">No citizen feedback found for your department.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-star-fill me-2"></i>
          Citizen Feedback
        </h2>
        <span className="badge bg-primary fs-6">
          {feedbacks.length} Feedbacks
        </span>
      </div>

      <div className="row g-4">
        {feedbacks.map((fb) => (
          <div key={fb.feedback_id} className="col-lg-6">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-header bg-white border-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="badge bg-secondary mb-2">
                      Complaint #{fb.complaint_id}
                    </span>
                    <h6 className="mb-0 fw-bold">{fb.location}</h6>
                  </div>
                  <span className={`badge bg-${fb.priority === "High" ? "danger" : fb.priority === "Medium" ? "warning" : "success"}`}>
                    {fb.priority}
                  </span>
                </div>
              </div>

              <div className="card-body">
                <p className="text-muted mb-2">
                  <strong>Description:</strong> {fb.description}
                </p>

                <div className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-info">{fb.status}</span>
                </div>

                <div className="mb-3">
                  <strong>Rating:</strong>
                  {renderStars(fb.rating)}
                </div>

                <div className="alert alert-light border">
                  <i className="bi bi-chat-left-text me-2 text-primary"></i>
                  {fb.feedback}
                </div>
              </div>

              <div className="card-footer bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    <i className="bi bi-person me-1"></i>
                    {fb.citizen_name}
                  </small>
                  <small className="text-muted">
                    <i className="bi bi-calendar me-1"></i>
                    {new Date(fb.created_at).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
