


import React, { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios"; // JWT axios
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function OfficerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    fetchOfficerProfile();
  }, []);

  const fetchOfficerProfile = async () => {
    try {
      const response = await privateAPI.get("/accounts/officer/profile/");
      setProfile(response.data.officer_profile);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load officer profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="text-primary">Loading Officer Profile</h4>
            <p className="text-muted">Please wait while we fetch your information</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-6 fw-bold text-primary">
                <i className="bi bi-person-badge me-2"></i>
                Officer Profile
              </h1>
              <p className="text-muted mb-0">
                View and manage your professional profile
              </p>
            </div>
            <button className="btn btn-outline-primary">
              <i className="bi bi-download me-2"></i>
              Export Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="row mb-4">
        <div className="col">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="card-header-bg" style={{
              height: '150px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              position: 'relative'
            }}>
              <div className="position-absolute top-100 start-4 translate-middle-y">
                <div className="d-flex align-items-center">
                  <div className="avatar-xl bg-white rounded-circle d-flex align-items-center justify-content-center shadow"
                    style={{
                      width: '120px',
                      height: '120px',
                      border: '5px solid white'
                    }}>
                    <span className="display-4 fw-bold text-primary">
                      {getInitials(profile.full_name)}
                    </span>
                  </div>
                  <div className="ms-4 mt-3">
                    <h2 className="fw-bold mb-1">{profile.full_name}</h2>
                    <p className="text-muted mb-2">
                      <i className="bi bi-award me-2"></i>
                      {profile.designation}
                    </p>
                    <div className="d-flex gap-2">
                      <span className={`badge ${profile.is_active ? 'bg-success' : 'bg-danger'} py-2 px-3`}>
                        <i className="bi bi-circle-fill me-1"></i>
                        {profile.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className={`badge ${profile.approval_status === 'Approved' ? 'bg-success' : profile.approval_status === 'Pending' ? 'bg-warning' : 'bg-secondary'} py-2 px-3`}>
                        <i className="bi bi-shield-check me-1"></i>
                        {profile.approval_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-5 mt-4">
              {/* Stats Row */}
              <div className="row g-4 mb-4">
                <div className="col-md-3">
                  <div className="text-center p-3 border rounded bg-light">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <i className="bi bi-building text-primary fs-3 me-2"></i>
                      <h4 className="fw-bold mb-0">Department</h4>
                    </div>
                    <p className="text-muted mb-0">{profile.department?.name || "Not Assigned"}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 border rounded bg-light">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <i className="bi bi-card-text text-info fs-3 me-2"></i>
                      <h4 className="fw-bold mb-0">License</h4>
                    </div>
                    <p className="text-muted mb-0">{profile.license_number}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 border rounded bg-light">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <i className="bi bi-envelope text-warning fs-3 me-2"></i>
                      <h4 className="fw-bold mb-0">Email</h4>
                    </div>
                    <p className="text-muted mb-0 truncate">{profile.email}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 border rounded bg-light">
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <i className="bi bi-telephone text-success fs-3 me-2"></i>
                      <h4 className="fw-bold mb-0">Phone</h4>
                    </div>
                    <p className="text-muted mb-0">{profile.phone}</p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="mb-4">
                <ul className="nav nav-tabs nav-justified">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                      onClick={() => setActiveTab('personal')}
                    >
                      <i className="bi bi-person me-2"></i>
                      Personal Details
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'professional' ? 'active' : ''}`}
                      onClick={() => setActiveTab('professional')}
                    >
                      <i className="bi bi-briefcase me-2"></i>
                      Professional Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'department' ? 'active' : ''}`}
                      onClick={() => setActiveTab('department')}
                    >
                      <i className="bi bi-building me-2"></i>
                      Department
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* Personal Details Tab */}
                {activeTab === 'personal' && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                          <h5 className="fw-bold mb-0">
                            <i className="bi bi-person-circle me-2"></i>
                            Personal Information
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label className="text-muted small">Full Name</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-person text-primary me-3"></i>
                                <span className="fw-medium">{profile.full_name}</span>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="text-muted small">Email Address</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-envelope text-primary me-3"></i>
                                <span className="fw-medium">{profile.email}</span>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="text-muted small">Phone Number</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-telephone text-primary me-3"></i>
                                <span className="fw-medium">{profile.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                          <h5 className="fw-bold mb-0">
                            <i className="bi bi-shield-check me-2"></i>
                            Account Status
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label className="text-muted small">Status</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <div className="d-flex align-items-center">
                                  <i className={`bi bi-circle-fill ${profile.is_active ? 'text-success' : 'text-danger'} me-3`}></i>
                                  <span className="fw-medium">{profile.is_active ? 'Active Account' : 'Inactive Account'}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 mb-3">
                              <label className="text-muted small">Approval Status</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <div className="d-flex align-items-center">
                                  <i className={`bi bi-shield-check me-3 ${profile.approval_status === 'Approved' ? 'text-success' : profile.approval_status === 'Pending' ? 'text-warning' : 'text-secondary'}`}></i>
                                  <span className="fw-medium">{profile.approval_status}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Professional Info Tab */}
                {activeTab === 'professional' && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                          <h5 className="fw-bold mb-0">
                            <i className="bi bi-briefcase me-2"></i>
                            Professional Details
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label className="text-muted small">Designation</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-award text-warning me-3"></i>
                                <span className="fw-medium">{profile.designation}</span>
                              </div>
                            </div>
                            <div className="col-12 mb-3">
                              <label className="text-muted small">License Number</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-card-text text-info me-3"></i>
                                <span className="fw-medium">{profile.license_number}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                          <h5 className="fw-bold mb-0">
                            <i className="bi bi-gear me-2"></i>
                            Account Information
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label className="text-muted small">User ID</label>
                              <div className="d-flex align-items-center p-2 border rounded bg-white">
                                <i className="bi bi-person-badge text-primary me-3"></i>
                                <span className="fw-medium">OFF-{profile.license_number?.split('-').pop() || 'ID'}</span>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="alert alert-info">
                                <i className="bi bi-info-circle me-2"></i>
                                For account updates or changes, please contact the system administrator.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Department Tab */}
                {activeTab === 'department' && (
                  <div className="row">
                    <div className="col-12">
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                          <h5 className="fw-bold mb-0">
                            <i className="bi bi-building me-2"></i>
                            Department Information
                          </h5>
                        </div>
                        <div className="card-body">
                          {profile.department?.name ? (
                            <div className="row">
                              <div className="col-md-8">
                                <div className="d-flex align-items-center mb-4">
                                  <div className="avatar-lg bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-4">
                                    <i className="bi bi-building text-primary fs-2"></i>
                                  </div>
                                  <div>
                                    <h4 className="fw-bold mb-1">{profile.department.name}</h4>
                                    <p className="text-muted mb-0">Assigned Department</p>
                                  </div>
                                </div>
                                
                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <label className="text-muted small">Department Code</label>
                                    <div className="d-flex align-items-center p-2 border rounded bg-white">
                                      <i className="bi bi-hash text-primary me-3"></i>
                                      <span className="fw-medium">{profile.department.code || 'DEPT-001'}</span>
                                    </div>
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <label className="text-muted small">Department Head</label>
                                    <div className="d-flex align-items-center p-2 border rounded bg-white">
                                      <i className="bi bi-person-check text-primary me-3"></i>
                                      <span className="fw-medium">{profile.department.head || 'Not Specified'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="card bg-light border-0 h-100">
                                  <div className="card-body d-flex flex-column justify-content-center">
                                    <h6 className="fw-bold text-primary mb-3">Department Responsibilities</h6>
                                    <ul className="list-unstyled">
                                      <li className="mb-2">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Public Complaint Management
                                      </li>
                                      <li className="mb-2">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Citizen Support Services
                                      </li>
                                      <li className="mb-2">
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Issue Resolution
                                      </li>
                                      <li>
                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                        Public Relations
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-5">
                              <i className="bi bi-building-slash text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                              <h5 className="text-muted mb-2">No Department Assigned</h5>
                              <p className="text-muted">You are currently not assigned to any department.</p>
                              <button className="btn btn-outline-primary">
                                <i className="bi bi-plus-circle me-2"></i>
                                Request Department Assignment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-lightning-charge me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <button className="btn btn-outline-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                    <i className="bi bi-pencil-square fs-2 mb-2"></i>
                    <span>Update Profile</span>
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-success w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                    <i className="bi bi-key fs-2 mb-2"></i>
                    <span>Change Password</span>
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-info w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                    <i className="bi bi-printer fs-2 mb-2"></i>
                    <span>Print Badge</span>
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3">
                    <i className="bi bi-question-circle fs-2 mb-2"></i>
                    <span>Get Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="row mt-4">
        <div className="col">
          <div className="alert alert-light border">
            <div className="d-flex align-items-center">
              <i className="bi bi-info-circle text-primary me-3 fs-4"></i>
              <div>
                <h6 className="fw-bold mb-1">Profile Information</h6>
                <p className="mb-0 small">
                  This information is used for official purposes. 
                  Ensure all details are accurate and up-to-date. 
                  Contact administration for any official record updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .avatar-xl {
          width: 120px;
          height: 120px;
        }
        
        .avatar-lg {
          width: 80px;
          height: 80px;
        }
        
        .nav-tabs .nav-link {
          color: #6c757d;
          padding: 1rem;
          border: none;
          border-bottom: 3px solid transparent;
        }
        
        .nav-tabs .nav-link.active {
          color: #667eea;
          border-bottom: 3px solid #667eea;
          background-color: transparent;
        }
        
        .nav-tabs .nav-link:hover {
          color: #667eea;
          border-bottom: 3px solid rgba(102, 126, 234, 0.5);
        }
        
        .card-header-bg {
          border-radius: 0.375rem 0.375rem 0 0;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}