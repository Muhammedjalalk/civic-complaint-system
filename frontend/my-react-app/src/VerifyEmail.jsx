import React, { useEffect, useState } from "react";
import apiClient from "./api/client";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  // Must match the route param names exactly: /verify-email/:uidb64/:token
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    // Backend endpoint (accounts/urls.py): GET /api/accounts/citizen/verify-email/?uid=...&token=...
    apiClient
      .get("/accounts/citizen/verify-email/", {
        params: { uid: uidb64, token },
      })
      .then(() => {
        setStatus("Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        const message =
          err.response?.data?.error || "Verification failed or link expired.";
        setStatus(message);
      });
  }, [uidb64, token, navigate]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyEmail;
