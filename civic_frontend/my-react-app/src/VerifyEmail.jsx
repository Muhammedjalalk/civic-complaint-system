import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/verify-email/${uid}/${token}/`)
      .then((res) => {
        setStatus("Email verified successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        setStatus("Verification failed or link expired.");
      });
  }, [uid, token, navigate]);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyEmail;
  