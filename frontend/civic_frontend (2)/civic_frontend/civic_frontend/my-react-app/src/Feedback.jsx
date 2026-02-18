import React, { useState } from "react";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function CitizenComplaintFeedbackForm({ complaintId }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    if (!rating || !feedback.trim()) {
      setMessage("⚠️ Please give rating and feedback");
      return;
    }

    try {
      setLoading(true);
      await privateAPI.post("/accounts/officer/feedback_view/", {
        complaint_id: complaintId,
        rating: rating,
        feedback: feedback,
      });

      setMessage("✅ Feedback submitted successfully");
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((i) => (
      <i
        key={i}
        className={`bi ${
          i <= rating ? "bi-star-fill text-warning" : "bi-star text-muted"
        } fs-4 me-1`}
        style={{ cursor: "pointer" }}
        onClick={() => setRating(i)}
      ></i>
    ));
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-chat-square-text me-2"></i>
            Complaint Feedback
          </h5>
        </div>

        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={submitFeedback}>
            <div className="mb-3">
              <label className="form-label fw-bold">Rating</label>
              <div>{renderStars()}</div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Feedback</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

