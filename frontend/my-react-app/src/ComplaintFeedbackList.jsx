import React from "react";

export default function ComplaintFeedbackList({ feedbacks }) {
  if (!feedbacks || feedbacks.length === 0) {
    return <p className="text-muted">No feedback available</p>;
  }

  return (
    <table className="table table-bordered mt-3">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Citizen</th>
          <th>Rating</th>
          <th>Feedback</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((fb, index) => (
          <tr key={fb.id}>
            <td>{index + 1}</td>
            <td>{fb.citizen}</td>
            <td>{fb.rating} ⭐</td>
            <td>{fb.feedback}</td>
            <td>{new Date(fb.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
