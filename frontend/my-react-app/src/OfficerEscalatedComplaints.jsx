

import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios";
import "bootstrap/dist/css/bootstrap.min.css";

const OfficerEscalatedComplaints = () => {
  const [escalations, setEscalations] = useState([]);
  const [verified, setVerified] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEscalations();
  }, []);

  const fetchEscalations = async () => {
    try {
      const res = await privateAPI.get(
        "/accounts/officer/escalated-complaints/"
      );
      setEscalations(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load escalated complaints");
    } finally {
      setLoading(false);
    }
  };

  // ✅ checkbox toggle
  const handleTickChange = (id) => {
    setVerified((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ FINAL VERIFICATION (REASSIGNED COMPLAINT)
  const handleFinalVerification = async (id) => {
    setActionLoading((prev) => ({ ...prev, [id]: true }));

    try {
      await privateAPI.post(
        "/accounts/accounts/officer/reassigned-verify/",
        { complaint_id: id } // 🔥 send complaint_id in body
      );

      // ✅ update UI without reload
      setEscalations((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "APPROVED" }
            : item
        )
      );

      // remove checkbox tick
      setVerified((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });

      alert("Complaint verified successfully");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error ||
          "Final verification failed"
      );
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

  if (loading)
    return <p className="text-center mt-5">Loading...</p>;

  if (error)
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );

  if (!escalations.length)
    return (
      <div className="alert alert-info text-center">
        No escalated complaints found
      </div>
    );

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-center">
        Officer – Escalated Complaints
      </h3>

      {escalations.map((item) => (
        <div key={item.id} className="card mb-4 shadow-sm">
          {/* HEADER */}
          <div className="card-header d-flex justify-content-between">
            <strong>Complaint #{item.complaint?.id}</strong>

            <span
              className={`badge ${
                item.status === "REASSIGNED"
                  ? "bg-info"
                  : item.status === "APPROVED"
                  ? "bg-success"
                  : item.status === "REJECTED"
                  ? "bg-danger"
                  : "bg-warning"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* BODY */}
          <div className="card-body">
            <p>
              <strong>Description:</strong>{" "}
              {item.complaint?.description || "—"}
            </p>
            <p>
              <strong>Priority:</strong>{" "}
              {item.complaint?.priority || "—"}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {item.complaint?.location || "—"}
            </p>

            <hr />

            <p>
              <strong>Escalated By:</strong>{" "}
              {item.escalated_by?.full_name ||
                item.escalated_by?.email}
            </p>

            <p>
              <strong>Escalated To:</strong>{" "}
              {item.escalated_to?.full_name ||
                "Not assigned"}
            </p>

            {item.reason && (
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>
            )}

            {/* ✅ STEP 1: CHECKBOX */}
            {item.status === "REASSIGNED" && (
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={verified[item.id] || false}
                  onChange={() =>
                    handleTickChange(item.id)
                  }
                />
                <label className="form-check-label">
                  Ready for final verification
                </label>
              </div>
            )}

            {/* ✅ STEP 2: FINAL VERIFICATION BUTTON */}
            {item.status === "REASSIGNED" &&
              verified[item.id] && (
                <div className="text-end mt-3">
                  <button
                    className="btn btn-success"
                    disabled={actionLoading[item.id]}
                    onClick={() =>
                      handleFinalVerification(item.id)
                    }
                  >
                    {actionLoading[item.id]
                      ? "Verifying..."
                      : "✔ Final Verification"}
                  </button>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficerEscalatedComplaints;
