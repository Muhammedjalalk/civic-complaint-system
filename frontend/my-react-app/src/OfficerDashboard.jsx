import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="d-flex" id="wrapper">

      {/* Sidebar */}
      <div className="bg-dark text-white p-3" id="sidebar">
        <h3 className="text-center mb-4 animate-title">Officer Panel</h3>

        <ul className="nav flex-column gap-2">
          <li>
            <a href="/dashboard" className="nav-link text-white menu-item">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="/complaints" className="nav-link text-white menu-item">
              <i className="bi bi-exclamation-circle me-2"></i> View Complaints
            </a>
          </li>
          <li>
            <a href="/verify" className="nav-link text-white menu-item">
              <i className="bi bi-person-check me-2"></i> Verify Citizens
            </a>
          </li>
          <li>
            <a href="/reports" className="nav-link text-white menu-item">
              <i className="bi bi-bar-chart me-2"></i> Reports
            </a>
          </li>
          <li>
            <a href="/profile" className="nav-link text-white menu-item">
              <i className="bi bi-person-circle me-2"></i> Profile
            </a>
          </li>
          <li>
            <a href="/logout" className="nav-link text-danger menu-item">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div id="page-content">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
          <button
            className="btn btn-dark me-3"
            id="menu-toggle"
            onClick={() => {
              document.getElementById("wrapper").classList.toggle("toggled");
            }}
          >
            <i className="bi bi-list"></i>
          </button>

          <span className="navbar-brand fw-bold">Officer Dashboard</span>
        </nav>

        {/* Content Section */}
        <div className="container mt-4">
          <h2 className="animate-heading">Welcome to Officer Dashboard</h2>
          <p className="animate-text">
            Here you can manage complaints, verify citizens, review reports, and more.
          </p>

          {/* Example Cards */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card dash-card shadow-sm">
                <div className="card-body">
                  <h5><i className="bi bi-exclamation-octagon text-danger"></i> Complaints</h5>
                  <p>View and update complaint status.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card dash-card shadow-sm">
                <div className="card-body">
                  <h5><i className="bi bi-person-check text-success"></i> Verification</h5>
                  <p>Approve or reject user profiles.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card dash-card shadow-sm">
                <div className="card-body">
                  <h5><i className="bi bi-bar-chart text-primary"></i> Reports</h5>
                  <p>View performance and system reports.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
