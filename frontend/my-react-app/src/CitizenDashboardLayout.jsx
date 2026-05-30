
// Updated code
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const CitizenDashboardLayout = ({ children }) => {
  const [citizenName, setCitizenName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  
  const navigate = useNavigate();
  const location = useLocation();

  // Government portal background
  const govBackgroundImage = "https://images.unsplash.com/photo-1551135049-8a33b2fb2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  useEffect(() => {
    const storedName = localStorage.getItem("full_name") || "Citizen";
    setCitizenName(storedName);
  }, []);

  // Logout function
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      // Call logout API if you have one
      // await privateAPI.post("/accounts/logout/");
      
      // Clear all local storage data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_info");
      localStorage.removeItem("full_name");
      localStorage.removeItem("citizen_id");
      localStorage.removeItem("email");
      
      // Clear any other citizen-related data
      localStorage.clear();
      
      // Redirect to login page
      navigate("/login");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local storage and redirect even if API call fails
      localStorage.clear();
      navigate("/login");
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "🏠",
      path: "/citizen/dashboard"
    },
    {
      id: "profile",
      name: "My Profile",
      icon: "👤",
      path: "/citizen-profile"
    },
    {
      id: "complaints",
      name: "File Complaint",
      icon: "📝",
      path: "/citizen/complaints"
    },
    {
      id: "history",
      name: "Complaint History",
      icon: "📋",
      path: "/citizen/complaints/history"
    },
    {
      id: "verified",
      name: "Verified Complaints",
      icon: "✅",
      path: "/citizen_view_final"
    },
    {
      id: "escalations",
      name: "Escalated Cases",
      icon: "⚠️",
      path: "/citizen/escalations"
    }
  ];

  return (
    <div className="min-vh-100" style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98)), url('${govBackgroundImage}')`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', sans-serif"
    }}>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow" style={{
        background: 'linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)',
        borderBottom: '3px solid #ffc107'
      }}>
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="navbar-brand d-flex align-items-center">
            <div className="bg-white rounded-circle p-2 me-2 shadow-sm">
              <span className="text-primary fw-bold" style={{ fontSize: '12px' }}>GOV</span>
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Citizen Grievance Portal</h6>
              <small className="text-light opacity-75">Government of India</small>
            </div>
          </div>

          <div className="d-flex align-items-center">
            {/* Notification Bell */}
            <div className="dropdown me-3">
              <button className="btn btn-light btn-sm position-relative" type="button">
                🔔 Notifications
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </button>
            </div>
            
            {/* User Profile Dropdown with Logout */}
            <div className="dropdown">
              <button className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                  alt="Profile" 
                  className="rounded-circle me-2"
                  width="30"
                  height="30"
                />
                {citizenName.split(' ')[0]}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button 
                    className="dropdown-item text-danger" 
                    onClick={handleLogout}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      width: '100%', 
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span className="me-2">🚪</span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Quick Logout Button */}
            <button 
              className="btn btn-outline-danger btn-sm ms-2"
              onClick={handleLogout}
              title="Logout"
              style={{ 
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <span className="me-1">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className={`col-md-3 col-lg-2 ${sidebarOpen ? 'd-block' : 'd-none'} p-0`}>
            <div className="bg-white h-100 shadow" style={{
              borderRight: '3px solid #0d6efd',
              minHeight: 'calc(100vh - 73px)'
            }}>
              {/* Profile Card */}
              <div className="text-center p-4" style={{
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderBottom: '2px solid #dee2e6'
              }}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                  alt="Profile" 
                  className="rounded-circle border border-3 border-primary mb-3 shadow"
                  width="80"
                  height="80"
                />
                <h6 className="fw-bold mb-1">{citizenName}</h6>
                <div className="d-flex justify-content-center align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">
                    ✅ Verified Citizen
                  </span>
                </div>
                {/* Quick Logout in Sidebar */}
                <button 
                  className="btn btn-sm btn-outline-danger mt-3 w-100"
                  onClick={handleLogout}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span className="me-2">🚪</span>
                  Logout
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="nav flex-column p-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-link text-start py-3 mb-2 rounded ${activeMenu === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMenu(item.id);
                      navigate(item.path);
                    }}
                    style={{
                      background: activeMenu === item.id ? 'linear-gradient(90deg, #0d6efd 0%, #198754 100%)' : 'transparent',
                      color: activeMenu === item.id ? 'white' : '#495057',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      borderLeft: activeMenu === item.id ? '4px solid #ffc107' : '4px solid transparent'
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3 fs-5">{item.icon}</span>
                      <span className="fw-medium">{item.name}</span>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Help Section */}
              <div className="p-3 mt-4 border-top">
                <h6 className="fw-bold text-muted mb-3">Emergency Contacts</h6>
                <div className="mb-2">
                  <small className="text-muted d-block">📞 Police</small>
                  <strong>100</strong>
                </div>
                <div className="mb-2">
                  <small className="text-muted d-block">🚑 Ambulance</small>
                  <strong>102</strong>
                </div>
                <div className="mb-2">
                  <small className="text-muted d-block">🔥 Fire</small>
                  <strong>101</strong>
                </div>
                <div className="mt-4">
                  <small className="text-muted d-block">📞 Grievance Helpline</small>
                  <strong>1800-XXX-XXXX</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 p-4">
            {/* Welcome Banner */}
            <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderLeft: '5px solid #0d6efd'
            }}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h4 className="fw-bold text-primary">
                      Welcome, {citizenName} 👋
                    </h4>
                    <p className="text-muted mb-0">
                      Track your complaints and stay updated on government actions.
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <div className="bg-primary bg-opacity-10 p-3 rounded d-inline-block">
                      <span className="display-6">🏛️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area with Government Styling */}
            <div className="card border-0 shadow-lg mb-4">
              <div className="card-header bg-white py-3" style={{
                borderBottom: '3px solid #0d6efd',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
              }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-0">
                      <span className="bg-primary text-white rounded-circle p-2 me-2">📋</span>
                      Citizen Portal
                    </h5>
                    <small className="text-muted">Government Grievance Redressal System</small>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">
                      <span className="me-1">📱</span> Mobile App
                    </button>
                    <button className="btn btn-sm btn-success">
                      <span className="me-1">🆘</span> Help
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-4">
                {/* Government Seal Banner */}
                <div className="text-center mb-4 p-3 rounded" style={{
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '2px dashed #0d6efd'
                }}>
                  <h6 className="fw-bold text-primary mb-1">
                    <span className="me-2">🛡️</span>
                    CITIZEN GRIEVANCE PORTAL
                  </h6>
                  <small className="text-muted">
                    Official platform for transparent grievance redressal
                  </small>
                </div>

                {/* Main Content */}
                <div className="bg-white p-4 rounded border">
                  {children}
                </div>

                {/* Government Footer Note */}
                <div className="mt-4 p-3 rounded" style={{
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  borderLeft: '4px solid #1976d2'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <span className="fs-4">ℹ️</span>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Important Notice</h6>
                      <p className="mb-0 text-muted small">
                        For any issues or assistance, contact the Grievance Redressal Officer at your district office.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <h6 className="fw-bold mb-3">Portal Information</h6>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <div className="text-center p-3 border rounded">
                          <span className="fs-1 d-block mb-2">📝</span>
                          <h5 className="fw-bold">File Complaint</h5>
                          <small className="text-muted">Submit new grievances</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="text-center p-3 border rounded">
                          <span className="fs-1 d-block mb-2">📊</span>
                          <h5 className="fw-bold">Track Status</h5>
                          <small className="text-muted">Monitor complaint progress</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="text-center p-3 border rounded">
                          <span className="fs-1 d-block mb-2">✅</span>
                          <h5 className="fw-bold">Verified</h5>
                          <small className="text-muted">Government verified cases</small>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="text-center p-3 border rounded">
                          <span className="fs-1 d-block mb-2">📞</span>
                          <h5 className="fw-bold">Support</h5>
                          <small className="text-muted">24/7 Helpline available</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-5 pt-4 border-top">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold">Citizen Grievance Portal</h6>
                  <p className="text-muted small">
                    Government of India initiative for transparent grievance redressal
                  </p>
                  <div className="mt-3">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleLogout}
                    >
                      <span className="me-1">🚪</span> Logout Portal
                    </button>
                  </div>
                </div>
                <div className="col-md-6 text-end">
                  <div className="mb-2">
                    <small className="text-muted me-3">📧 support@govgrievance.gov.in</small>
                    <small className="text-muted">📞 1800-XXX-XXXX</small>
                  </div>
                  <div className="small">
                    <span className="text-muted me-3">© 2024 Government Portal</span>
                    <a href="#" className="text-decoration-none me-3">Privacy</a>
                    <a href="#" className="text-decoration-none">Terms</a>
                  </div>
                  <div className="mt-3">
                    <small className="text-muted">User: {citizenName}</small>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      {!sidebarOpen && (
        <button 
          className="btn btn-primary rounded-circle shadow-lg position-fixed"
          style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}

      <style jsx>{`
        .card {
          border-radius: 10px;
          transition: transform 0.2s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
        }
        
        .nav-link:hover {
          background: linear-gradient(90deg, rgba(13, 110, 253, 0.1) 0%, rgba(25, 135, 84, 0.1) 100%) !important;
        }
        
        .active {
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
        }
        
        @media (max-width: 768px) {
          .navbar-brand h6 {
            font-size: 14px;
          }
          
          .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
          }
        }
        
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CitizenDashboardLayout;