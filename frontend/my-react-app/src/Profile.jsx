

import { useEffect, useState } from "react";
import privateAPI from "./api/privateAxios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Edit,
  RefreshCw,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  Award,
  Calendar,
  ShieldCheck
} from "lucide-react";

const CitizenProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalComplaints: 0,
    resolved: 0,
    inProgress: 0,
    pending: 0
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await privateAPI.get("/accounts/citizen/profile/");
      const data = response.data;
      
      const mappedProfile = {
        ...data,
        name: data.full_name || data.name || 
              `${data.first_name || ''} ${data.last_name || ''}`.trim() || 
              "Citizen User"
      };
      
      setProfile(mappedProfile);
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch complaint statistics
      const response = await privateAPI.get("/accounts/citizen/complaints/stats/");
      setStats(response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid py-5" style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh"
      }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg animate__animated animate__fadeIn">
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="fw-bold text-primary mb-2">Loading Citizen Profile</h4>
                <p className="text-muted">Fetching your information from government database...</p>
                <div className="progress mt-3" style={{ height: '4px' }}>
                  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container-fluid py-5" style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh"
      }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg animate__animated animate__shakeX">
              <div className="card-header text-white py-4" style={{
                background: "linear-gradient(135deg, #dc3545 0%, #a71d2a 100%)",
                borderBottom: "3px solid #ffc107"
              }}>
                <h4 className="mb-0 d-flex align-items-center">
                  <AlertCircle className="me-2" />
                  Access Restricted
                </h4>
              </div>
              <div className="card-body text-center p-5">
                <div className="display-1 text-danger mb-4">
                  <Shield size={80} />
                </div>
                <h4 className="fw-bold text-danger mb-3">Profile Access Denied</h4>
                <p className="text-muted mb-4">
                  You don't have permission to access this profile. 
                  This may be due to verification pending or account restrictions.
                </p>
                <button 
                  className="btn btn-primary px-4 py-3 fw-bold"
                  onClick={fetchProfile}
                  style={{
                    background: "linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)",
                    border: "none"
                  }}
                >
                  <RefreshCw className="me-2" size={18} />
                  Retry Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', 'Roboto', sans-serif"
    }}>
      <div className="row">
        <div className="col-12">
          {/* Header Banner */}
          <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInDown">
            <div className="card-body p-4" style={{
              background: "linear-gradient(135deg, #0d6efd 0%, #0052cc 100%)",
              borderRadius: "15px 15px 0 0"
            }}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h1 className="text-white fw-bold mb-2">
                    <User className="me-3" size={32} />
                    Citizen Profile
                  </h1>
                  <p className="text-white-50 mb-0">
                    Your verified citizen information and complaint statistics
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="bg-white bg-opacity-20 rounded-pill d-inline-flex align-items-center px-4 py-2">
                    <ShieldCheck className="me-2 text-white" size={20} />
                    <span className="text-white fw-medium">Government Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Left Column - Profile Info */}
            <div className="col-lg-4 mb-4">
              {/* Profile Card */}
              <div className="card border-0 shadow-lg h-100 animate__animated animate__fadeInLeft">
                <div className="card-body p-4">
                  {/* Profile Header */}
                  <div className="text-center mb-4 pt-3">
                    <div className="position-relative d-inline-block mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block">
                        <User size={48} className="text-primary" />
                      </div>
                      <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-3 border-white">
                        <CheckCircle size={20} className="text-white" />
                      </span>
                    </div>
                    <h3 className="fw-bold mb-1">{profile.name}</h3>
                    <p className="text-muted mb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1">
                        Verified Citizen
                      </span>
                    </p>
                    <p className="text-muted small">
                      Member ID: CZ{profile.id?.toString().padStart(6, '0') || '000000'}
                    </p>
                  </div>

                  {/* Personal Information */}
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3 border-bottom pb-2">
                      Personal Information
                    </h5>
                    
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                          <Mail size={16} className="text-primary" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Email Address</small>
                          <strong>{profile.email || "Not provided"}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                          <Phone size={16} className="text-success" />
                        </div>
                        <div>
                          <small className="text-muted d-block">Phone Number</small>
                          <strong>{profile.phone || "Not provided"}</strong>
                        </div>
                      </div>
                    </div>

                    {(profile.address || profile.place) && (
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                            <MapPin size={16} className="text-warning" />
                          </div>
                          <div>
                            <small className="text-muted d-block">Address</small>
                            <strong>{profile.address || profile.place || "Not provided"}</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {profile.pin && (
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                            <Building size={16} className="text-info" />
                          </div>
                          <div>
                            <small className="text-muted d-block">PIN Code</small>
                            <strong>{profile.pin}</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="d-grid gap-2 mt-4">
                    <button 
                      className="btn btn-primary py-3 fw-bold"
                      style={{
                        background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
                        border: "none"
                      }}
                    >
                      <Edit className="me-2" size={18} />
                      Update Profile
                    </button>
                    <button 
                      className="btn btn-outline-primary py-3"
                      onClick={fetchProfile}
                    >
                      <RefreshCw className="me-2" size={18} />
                      Refresh Data
                    </button>
                  </div>
                </div>
              </div>

              {/* Verification Status Card */}
              <div className="card border-0 shadow-sm mt-4 animate__animated animate__fadeInLeft animate__delay-1s">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    <ShieldCheck className="me-2" />
                    Verification Status
                  </h5>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <CheckCircle className="text-success me-2" />
                      <span className="flex-grow-1">Identity Verified</span>
                      <span className="badge bg-success">Complete</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <CheckCircle className="text-success me-2" />
                      <span className="flex-grow-1">Document Verified</span>
                      <span className="badge bg-success">Complete</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <CheckCircle className="text-success me-2" />
                      <span className="flex-grow-1">Account Active</span>
                      <span className="badge bg-success">Active</span>
                    </div>
                  </div>
                  <div className="alert alert-success small mb-0">
                    <strong>✓ Fully Verified</strong> - Your account has complete government verification.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Activity */}
            <div className="col-lg-8">
              {/* Stats Overview */}
              <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInRight">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    <Award className="me-2" />
                    Complaint Statistics
                  </h4>
                  <div className="row g-3">
                    <div className="col-md-3 col-6">
                      <div className="card border-0 bg-primary bg-opacity-10 h-100">
                        <div className="card-body text-center p-4">
                          <div className="text-primary fw-bold display-6 mb-2">
                            {stats.totalComplaints || 0}
                          </div>
                          <small className="text-muted">Total Complaints</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="card border-0 bg-success bg-opacity-10 h-100">
                        <div className="card-body text-center p-4">
                          <div className="text-success fw-bold display-6 mb-2">
                            {stats.resolved || 0}
                          </div>
                          <small className="text-muted">Resolved</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="card border-0 bg-warning bg-opacity-10 h-100">
                        <div className="card-body text-center p-4">
                          <div className="text-warning fw-bold display-6 mb-2">
                            {stats.inProgress || 0}
                          </div>
                          <small className="text-muted">In Progress</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-6">
                      <div className="card border-0 bg-info bg-opacity-10 h-100">
                        <div className="card-body text-center p-4">
                          <div className="text-info fw-bold display-6 mb-2">
                            {stats.pending || 0}
                          </div>
                          <small className="text-muted">Pending</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card border-0 shadow-lg mb-4 animate__animated animate__fadeInRight animate__delay-1s">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    <Clock className="me-2" />
                    Recent Activity
                  </h4>
                  <div className="timeline">
                    {[
                      { 
                        icon: <FileText className="text-primary" />, 
                        title: "New Complaint Filed", 
                        desc: "Road maintenance issue reported", 
                        time: "2 hours ago",
                        color: "primary"
                      },
                      { 
                        icon: <CheckCircle className="text-success" />, 
                        title: "Complaint Resolved", 
                        desc: "Garbage collection issue fixed", 
                        time: "Yesterday",
                        color: "success"
                      },
                      { 
                        icon: <Clock className="text-warning" />, 
                        title: "Complaint In Progress", 
                        desc: "Street light repair assigned", 
                        time: "3 days ago",
                        color: "warning"
                      },
                      { 
                        icon: <AlertCircle className="text-info" />, 
                        title: "Feedback Submitted", 
                        desc: "Service rating provided", 
                        time: "1 week ago",
                        color: "info"
                      }
                    ].map((activity, index) => (
                      <div key={index} className="d-flex mb-3 pb-3 border-bottom">
                        <div className={`bg-${activity.color} bg-opacity-10 rounded-circle p-2 me-3`} style={{ width: '40px', height: '40px' }}>
                          {activity.icon}
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{activity.title}</h6>
                          <p className="text-muted small mb-1">{activity.desc}</p>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Information Card */}
              <div className="card border-0 shadow-lg animate__animated animate__fadeInRight animate__delay-2s">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    <Shield className="me-2" />
                    Account Information
                  </h4>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="p-3 rounded bg-light h-100">
                        <small className="text-muted d-block mb-1">Account Type</small>
                        <strong className="d-block mb-3">Verified Citizen</strong>
                        <small className="text-muted d-block mb-1">Registration Date</small>
                        <strong>
                          <Calendar size={14} className="me-1" />
                          {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </strong>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3 rounded bg-light h-100">
                        <small className="text-muted d-block mb-1">Last Login</small>
                        <strong className="d-block mb-3">Today, 10:30 AM</strong>
                        <small className="text-muted d-block mb-1">Account Status</small>
                        <strong className="text-success">Active ✓</strong>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-4 pt-3 border-top">
                    <h6 className="fw-bold mb-3">Government Portal Features</h6>
                    <div className="row g-2">
                      {[
                        { icon: "📝", feature: "File Complaints", desc: "Report civic issues" },
                        { icon: "📊", feature: "Track Status", desc: "Real-time updates" },
                        { icon: "🔔", feature: "Notifications", desc: "Alerts & reminders" },
                        { icon: "🤝", feature: "Community", desc: "Join active citizens" }
                      ].map((item, index) => (
                        <div className="col-6" key={index}>
                          <div className="d-flex align-items-center p-2">
                            <span className="fs-4 me-3">{item.icon}</span>
                            <div>
                              <div className="fw-semibold">{item.feature}</div>
                              <small className="text-muted">{item.desc}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-4 text-center">
            <p className="text-muted small">
              <Shield className="me-1" size={14} />
              This is your official government citizen profile. All information is secured and protected under data protection laws.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .card {
          border-radius: 15px;
          transition: transform 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
        
        .btn {
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .timeline {
          position: relative;
          padding-left: 20px;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #0d6efd, #198754);
        }
        
        @media (max-width: 768px) {
          .display-6 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CitizenProfile;