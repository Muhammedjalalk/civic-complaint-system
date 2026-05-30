

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./StaffDashboard.css"; // Optional: for custom styles

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [staffName, setStaffName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Protect route with more comprehensive check
    const userType = localStorage.getItem("user_type");
    const name = localStorage.getItem("name");
    
    if (userType !== "staff") {
      navigate("/login", { replace: true });
      return;
    }
    
    if (name) {
      setStaffName(name);
    }
    
    setIsLoading(false);
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [navigate]);

  const handleLogout = useCallback(() => {
    // Clear all relevant localStorage items
    localStorage.removeItem("user_type");
    localStorage.removeItem("name");
    localStorage.removeItem("token"); // If using token-based auth
    localStorage.removeItem("staff_id");
    
    // Optional: Clear sessionStorage if used
    sessionStorage.clear();
    
    navigate("/login", { replace: true });
  }, [navigate]);

  // Navigation handlers with error boundaries
  const goToTasks = useCallback(() => {
    navigate("/staff/Assign_complained_view");
  }, [navigate]);

  const goToStatus = useCallback(() => {
    navigate("/staff-status");
  }, [navigate]);

  const goToProfile = useCallback(() => {
    navigate("/staff_profile_view");
  }, [navigate]);

  // Handle session timeout warning
  useEffect(() => {
    const checkAuth = () => {
      const userType = localStorage.getItem("user_type");
      if (userType !== "staff") {
        handleLogout();
      }
    };

    // Check authentication every 30 seconds
    const interval = setInterval(checkAuth, 30000);
    
    return () => clearInterval(interval);
  }, [handleLogout]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">Staff Dashboard</span>
          
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-4">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-2"
                   style={{ width: '40px', height: '40px' }}>
                <span className="text-primary fw-bold">
                  {staffName ? staffName.charAt(0).toUpperCase() : 'S'}
                </span>
              </div>
              <div className="text-white">
                <div className="small">Welcome back,</div>
                <strong>{staffName || "Staff Member"}</strong>
              </div>
            </div>
            
            <button
              className="btn btn-outline-light d-flex align-items-center"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                   className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-5">
        <header className="mb-5 animate__animated animate__fadeInDown">
          <h1 className="fw-bold text-primary mb-3">Dashboard Overview</h1>
          <p className="text-muted">
            Manage your tasks, update work status, and view your profile
          </p>
        </header>

        {/* Dashboard Cards */}
        <div className="row g-4 mb-5">
          {/* Card 1 - View Tasks */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg animate__animated animate__fadeInUp animate__delay-1s hover-lift">
              <div className="card-body text-center p-4 d-flex flex-column">
                <div className="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-4"
                     style={{ width: '80px', height: '80px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                       className="bi bi-clipboard-check mt-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                </div>
                <h5 className="card-title fw-bold mb-3">Assigned Tasks</h5>
                <p className="text-muted flex-grow-1">
                  View, manage, and update tasks assigned to you
                </p>
                <button
                  className="btn btn-primary btn-lg px-4 mt-3"
                  onClick={goToTasks}
                  aria-label="View assigned tasks"
                >
                  View Tasks
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 - Update Status */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg animate__animated animate__fadeInUp animate__delay-2s hover-lift">
              <div className="card-body text-center p-4 d-flex flex-column">
                <div className="icon-wrapper bg-success bg-opacity-10 text-success rounded-circle mx-auto mb-4"
                     style={{ width: '80px', height: '80px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                       className="bi bi-clock-history mt-3" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </div>
                <h5 className="card-title fw-bold mb-3">Work Status</h5>
                <p className="text-muted flex-grow-1">
                  Update your current work status and progress
                </p>
                <button
                  className="btn btn-success btn-lg px-4 mt-3"
                  onClick={goToStatus}
                  aria-label="Update work status"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - View Profile */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg animate__animated animate__fadeInUp animate__delay-3s hover-lift">
              <div className="card-body text-center p-4 d-flex flex-column">
                <div className="icon-wrapper bg-warning bg-opacity-10 text-warning rounded-circle mx-auto mb-4"
                     style={{ width: '80px', height: '80px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" 
                       className="bi bi-person-circle mt-3" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                </div>
                <h5 className="card-title fw-bold mb-3">My Profile</h5>
                <p className="text-muted flex-grow-1">
                  View and manage your profile information
                </p>
                <button
                  className="btn btn-warning btn-lg px-4 mt-3"
                  onClick={goToProfile}
                  aria-label="View my profile"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Announcement Section */}
        <section className="bg-white shadow rounded-3 p-4 animate__animated animate__fadeIn">
          <div className="d-flex align-items-center mb-3">
            <div className="bg-info bg-opacity-10 p-2 rounded me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                   className="bi bi-megaphone text-info" viewBox="0 0 16 16">
                <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z"/>
              </svg>
            </div>
            <h5 className="mb-0 fw-bold">📢 Important Notice</h5>
          </div>
          <div className="alert alert-info bg-opacity-10 border-0">
            <p className="mb-2">
              <strong>Please ensure:</strong>
            </p>
            <ul className="mb-0 ps-3">
              <li>All assigned work is completed within the given time frame</li>
              <li>Update your work status regularly for accurate tracking</li>
              <li>Contact the supervising officer immediately if you face any issues</li>
              <li>Review tasks daily for any priority updates</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-5 pt-4 border-top text-center text-muted small">
          <p className="mb-0">
            © {new Date().getFullYear()} Staff Dashboard. All rights reserved.
          </p>
          <p className="mb-0">
            Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </p>
        </footer>
      </main>
    </div>
  );
}