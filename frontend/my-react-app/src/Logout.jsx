// src/logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear user session or token
    localStorage.removeItem("token"); // example
    localStorage.removeItem("user");  // optional

    // 2. Redirect to Home page
    navigate("/");
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;
