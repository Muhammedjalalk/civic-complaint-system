// import { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios";

// const CitizenEscalatedComplaints = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await privateAPI.get("/accounts/citizen/escalated-complaints/");
//         setData(res.data);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.status === 401 ? "Unauthorized! Please login." : "Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!data.length) return <p>No escalated complaints.</p>;

//   return (
//     <div>
//       <h2>Escalated Complaints</h2>
//       {data.map((item) => (
//         <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
//           <p><strong>ID:</strong> {item.complaint.id}</p>
//           <p><strong>Description:</strong> {item.complaint.description}</p>
//           <p><strong>Priority:</strong> {item.complaint.priority}</p>
//           <p><strong>Status:</strong> {item.status}</p>
//           <p><strong>Escalated By:</strong> {item.escalated_by.full_name}</p>
//           <p><strong>Escalated To:</strong> {item.escalated_to?.full_name || "Not assigned"}</p>
//           <p><strong>Reason:</strong> {item.reason}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CitizenEscalatedComplaints;

// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios"; // axios instance with token
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CitizenEscalatedComplaints = () => {
//   const [escalations, setEscalations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEscalations = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         setError("You must be logged in to view escalated complaints.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await privateAPI.get("/accounts/citizen/escalated-complaints/");
//         setEscalations(res.data);
//       } catch (err) {
//         console.error(err);
//         if (err.response?.status === 401) {
//           setError("Unauthorized! Please login again.");
//           localStorage.clear();
//           setTimeout(() => navigate("/login"), 2000);
//         } else {
//           setError("Failed to fetch escalated complaints.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEscalations();
//   }, [navigate]);

//   if (loading) return <p className="text-center mt-5">Loading...</p>;
//   if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;
//   if (escalations.length === 0) return <div className="alert alert-info mt-4 text-center">No escalated complaints found.</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-4">My Escalated Complaints</h2>
//       {escalations.map((item) => (
//         <div key={item.id} className="card mb-3 shadow-sm">
//           <div className="card-header d-flex justify-content-between">
//             <strong>Complaint #{item.complaint?.id}</strong>
//             <span className={`badge ${
//               item.status === "PENDING" ? "bg-warning" :
//               item.status === "APPROVED" ? "bg-success" :
//               item.status === "REJECTED" ? "bg-danger" :
//               item.status === "REASSIGNED" ? "bg-info" : "bg-secondary"
//             }`}>
//               {item.status}
//             </span>
//           </div>

//           <div className="card-body">
//             <p><strong>Description:</strong> {item.complaint?.description || "—"}</p>
//             {item.complaint?.suggestion && <p><strong>Suggestion:</strong> {item.complaint.suggestion}</p>}
//             {item.complaint?.attachment && (
//               <p>
//                 <strong>Attachment:</strong>{" "}
//                 <a href={item.complaint.attachment} target="_blank" rel="noopener noreferrer">View File</a>
//               </p>
//             )}
//             <p><strong>Priority:</strong> {item.complaint?.priority || "—"}</p>
//             <p><strong>Location:</strong> {item.complaint?.location || "—"}</p>

//             <hr />
//             <p><strong>Escalated By:</strong> {item.escalated_by?.full_name || item.escalated_by?.email || "—"}</p>
//             <p><strong>Escalated To:</strong> {item.escalated_to?.full_name || item.escalated_to?.email || "Not assigned"}</p>
//             {item.reason && <p><strong>Reason:</strong> {item.reason}</p>}
//             <p><strong>Escalated At:</strong> {new Date(item.escalated_at).toLocaleString()}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CitizenEscalatedComplaints;

// import React, { useEffect, useState } from "react";
// import privateAPI from "./api/privateAxios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CitizenEscalatedComplaints = () => {
//   const [escalations, setEscalations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEscalations = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         setError("You must be logged in to view escalated complaints.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await privateAPI.get("/accounts/citizen/escalated-complaints/");
//         setEscalations(res.data);
//       } catch (err) {
//         console.error(err);
//         if (err.response?.status === 401) {
//           setError("Unauthorized! Please login again.");
//           localStorage.clear();
//           setTimeout(() => navigate("/login"), 2000);
//         } else {
//           setError("Failed to fetch escalated complaints.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEscalations();
//   }, [navigate]);

//   if (loading) return <p className="text-center mt-5">Loading...</p>;
//   if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;
//   if (escalations.length === 0) return <div className="alert alert-info mt-4 text-center">No escalated complaints found.</div>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-4">My Escalated Complaints</h2>
//       {escalations.map((item) => (
//         <div key={item.id} className="card mb-3 shadow-sm">
//           <div className="card-body">
//             <p><strong>Escalated At:</strong> {new Date(item.escalated_at).toLocaleString()}</p>
//             <p><strong>Priority:</strong> {item.complaint?.priority || "—"}</p>
//             <p><strong>Location:</strong> {item.complaint?.location || "—"}</p>
//             <p><strong>Status:</strong> {item.status}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CitizenEscalatedComplaints;


  import React, { useEffect, useState } from "react";
  import privateAPI from "./api/privateAxios";
  import { useNavigate, Link } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "animate.css";
  import "./CitizenEscalatedComplaints.css"; // We'll create this CSS file

  const CitizenEscalatedComplaints = () => {
    const [escalations, setEscalations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [stats, setStats] = useState({
      total: 0,
      pending: 0,
      inProgress: 0,
      resolved: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
      const fetchEscalations = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("You must be logged in to view escalated complaints.");
          setLoading(false);
          return;
        }

        try {
          const res = await privateAPI.get("/accounts/citizen/escalated-complaints/");
          setEscalations(res.data);
          
          // Calculate stats
          const total = res.data.length;
          const pending = res.data.filter(e => e.status === "PENDING").length;
          const inProgress = res.data.filter(e => e.status === "IN_PROGRESS").length;
          const resolved = res.data.filter(e => e.status === "RESOLVED").length;
          
          setStats({ total, pending, inProgress, resolved });
        } catch (err) {
          console.error(err);
          if (err.response?.status === 401) {
            setError("Unauthorized! Please login again.");
            localStorage.clear();
            setTimeout(() => navigate("/login"), 2000);
          } else {
            setError("Failed to fetch escalated complaints.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchEscalations();
    }, [navigate]);

    const filteredEscalations = escalations.filter(item => {
      const matchesFilter = filter === "all" || item.status === filter.toUpperCase().replace(" ", "_");
      const matchesSearch = 
        (item.complaint?.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.complaint?.location?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.status?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const getPriorityBadge = (priority) => {
      switch(priority?.toUpperCase()) {
        case "HIGH":
          return <span className="badge bg-danger animate__animated animate__pulse"><i className="bi bi-exclamation-triangle me-1"></i> High</span>;
        case "MEDIUM":
          return <span className="badge bg-warning"><i className="bi bi-exclamation-circle me-1"></i> Medium</span>;
        case "LOW":
          return <span className="badge bg-info"><i className="bi bi-info-circle me-1"></i> Low</span>;
        default:
          return <span className="badge bg-secondary">Not Set</span>;
      }
    };

    const getStatusBadge = (status) => {
      switch(status?.toUpperCase()) {
        case "PENDING":
          return <span className="badge bg-warning"><i className="bi bi-clock me-1"></i> Pending</span>;
        case "IN_PROGRESS":
          return <span className="badge bg-primary"><i className="bi bi-gear me-1"></i> In Progress</span>;
        case "RESOLVED":
          return <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i> Resolved</span>;
        case "ESCALATED":
          return <span className="badge bg-danger"><i className="bi bi-arrow-up-circle me-1"></i> Escalated</span>;
        default:
          return <span className="badge bg-secondary">{status || "Unknown"}</span>;
      }
    };

    const getDaysAgo = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    if (loading) {
      return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient-primary">
          <div className="text-center text-white">
            <div className="spinner-border mb-3" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4>Loading Escalated Complaints...</h4>
            <p className="text-white-50">Please wait while we fetch your data</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-lg animate__animated animate__shakeX">
                <div className="card-body text-center p-5">
                  <div className="avatar-xl bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                    <i className="bi bi-exclamation-triangle fs-1 text-danger"></i>
                  </div>
                  <h3 className="fw-bold text-danger mb-3">Error Loading Data</h3>
                  <p className="text-muted mb-4">{error}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-fluid px-0">
        {/* Animated Background */}
        <div className="position-fixed top-0 start-0 w-100 h-100" style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          zIndex: -1,
          opacity: 0.05
        }}></div>

        {/* Header Section */}
        <div className="bg-white shadow-sm py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="fw-bold mb-0 text-primary">
                  <i className="bi bi-arrow-up-circle-fill me-2"></i>
                  Escalated Complaints
                </h1>
                <p className="text-muted mb-0">Track your complaints that have been escalated for higher priority</p>
              </div>
              <div className="col-md-6 text-end">
                <Link to="/citizen/complaints" className="btn btn-outline-primary me-2">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Complaints
                </Link>
                <button className="btn btn-primary" onClick={() => navigate("/citizen/file-complaint")}>
                  <i className="bi bi-plus-circle me-2"></i>
                  File New Complaint
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="container mt-4">
          <div className="row g-3">
            <div className="col-md-3">
              <div className="card stat-card border-0 shadow-sm animate__animated animate__fadeIn">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Total Escalations</h6>
                      <h2 className="mb-0 fw-bold">{stats.total}</h2>
                    </div>
                    <div className="avatar bg-primary-subtle p-3 rounded-circle">
                      <i className="bi bi-arrow-up-circle fs-3 text-primary"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card border-0 shadow-sm animate__animated animate__fadeIn" style={{animationDelay: '0.1s'}}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Pending</h6>
                      <h2 className="mb-0 fw-bold">{stats.pending}</h2>
                    </div>
                    <div className="avatar bg-warning-subtle p-3 rounded-circle">
                      <i className="bi bi-clock fs-3 text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card border-0 shadow-sm animate__animated animate__fadeIn" style={{animationDelay: '0.2s'}}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">In Progress</h6>
                      <h2 className="mb-0 fw-bold">{stats.inProgress}</h2>
                    </div>
                    <div className="avatar bg-info-subtle p-3 rounded-circle">
                      <i className="bi bi-gear fs-3 text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card border-0 shadow-sm animate__animated animate__fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">Resolved</h6>
                      <h2 className="mb-0 fw-bold">{stats.resolved}</h2>
                    </div>
                    <div className="avatar bg-success-subtle p-3 rounded-circle">
                      <i className="bi bi-check-circle fs-3 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="container mt-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Search complaints by location, status, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-wrap gap-2">
                    <button 
                      className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setFilter('all')}
                    >
                      All ({stats.total})
                    </button>
                    <button 
                      className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => setFilter('pending')}
                    >
                      Pending ({stats.pending})
                    </button>
                    <button 
                      className={`btn ${filter === 'in_progress' ? 'btn-info' : 'btn-outline-info'}`}
                      onClick={() => setFilter('in_progress')}
                    >
                      In Progress ({stats.inProgress})
                    </button>
                    <button 
                      className={`btn ${filter === 'resolved' ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => setFilter('resolved')}
                    >
                      Resolved ({stats.resolved})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mt-4">
          {filteredEscalations.length === 0 ? (
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center p-5">
                <div className="avatar-xl bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4">
                  <i className="bi bi-check-circle fs-1 text-success"></i>
                </div>
                <h3 className="fw-bold text-success mb-3">No Escalated Complaints Found!</h3>
                <p className="text-muted mb-4">
                  {searchTerm 
                    ? "No escalated complaints match your search criteria."
                    : "You have no escalated complaints at the moment. All your complaints are being handled appropriately."}
                </p>
                <Link to="/citizen/complaints" className="btn btn-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  View All Complaints
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {filteredEscalations.map((item, index) => (
                  <div key={item.id} className="col-md-6 col-lg-4">
                    <div className={`card escalation-card border-0 shadow-sm h-100 animate__animated animate__fadeInUp`}
                        style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="card-body p-4">
                        {/* Header with ID and Status */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h6 className="text-muted mb-1">Escalation ID</h6>
                            <h5 className="fw-bold text-primary">#{item.id}</h5>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>

                        {/* Complaint Details */}
                        <div className="mb-4">
                          <h6 className="fw-bold mb-2">
                            <i className="bi bi-chat-left-text me-2 text-primary"></i>
                            Complaint Details
                          </h6>
                          <p className="text-muted mb-2">
                            {item.complaint?.description || "No description available"}
                          </p>
                          <div className="d-flex align-items-center text-muted small">
                            <i className="bi bi-geo-alt me-2"></i>
                            {item.complaint?.location || "Location not specified"}
                          </div>
                        </div>

                        {/* Priority and Dates */}
                        <div className="row g-2 mb-4">
                          <div className="col-6">
                            <div className="bg-light p-3 rounded">
                              <small className="text-muted d-block mb-1">Priority Level</small>
                              {getPriorityBadge(item.complaint?.priority)}
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-light p-3 rounded">
                              <small className="text-muted d-block mb-1">Escalated</small>
                              <div className="fw-bold">
                                {getDaysAgo(item.escalated_at)} day{getDaysAgo(item.escalated_at) !== 1 ? 's' : ''} ago
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-4">
                          <h6 className="fw-bold mb-3">
                            <i className="bi bi-clock-history me-2 text-primary"></i>
                            Timeline
                          </h6>
                          <div className="timeline">
                            <div className="timeline-item">
                              <div className="timeline-marker bg-primary"></div>
                              <div className="timeline-content">
                                <small className="text-muted">Escalated</small>
                                <p className="mb-0">{new Date(item.escalated_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="timeline-item">
                              <div className={`timeline-marker ${item.status === 'RESOLVED' ? 'bg-success' : 'bg-secondary'}`}></div>
                              <div className="timeline-content">
                                <small className="text-muted">Current Status</small>
                                <p className="mb-0">{item.status.replace('_', ' ').toLowerCase()}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-primary btn-sm flex-fill"
                            onClick={() => navigate(`/citizen/complaint/${item.complaint?.id}`)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            View Details
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-chat me-1"></i>
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-4">
                <p className="text-muted">
                  Showing {filteredEscalations.length} of {escalations.length} escalated complaints
                </p>
              </div>
            </>
          )}
        </div>

        {/* Help Section */}
        <div className="container mt-5">
          <div className="card border-0 shadow-sm bg-gradient-primary text-white">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="fw-bold mb-2">
                    <i className="bi bi-info-circle me-2"></i>
                    Need Help With Your Escalated Complaint?
                  </h4>
                  <p className="mb-0 opacity-75">
                    If your complaint has been escalated and you need immediate assistance, 
                    please contact our support team directly.
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <button className="btn btn-light">
                    <i className="bi bi-telephone me-2"></i>
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-light py-4 mt-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-0 text-muted">
                  <i className="bi bi-shield-check me-2"></i>
                  Citizen Portal • Escalated Complaints
                </p>
              </div>
              <div className="col-md-6 text-end">
                <p className="mb-0 text-muted">
                  Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS */}
        <style jsx>{`
          .escalation-card {
            transition: all 0.3s ease;
            border: 1px solid #e9ecef;
          }
          
          .escalation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
            border-color: #667eea;
          }
          
          .stat-card {
            transition: all 0.3s ease;
          }
          
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
          }
          
          .avatar {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .avatar-xl {
            width: 80px;
            height: 80px;
          }
          
          .bg-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .bg-primary-subtle {
            background-color: rgba(13, 110, 253, 0.1);
          }
          
          .bg-warning-subtle {
            background-color: rgba(255, 193, 7, 0.1);
          }
          
          .bg-info-subtle {
            background-color: rgba(13, 202, 240, 0.1);
          }
          
          .bg-success-subtle {
            background-color: rgba(25, 135, 84, 0.1);
          }
          
          .timeline {
            position: relative;
            padding-left: 30px;
          }
          
          .timeline-item {
            position: relative;
            margin-bottom: 20px;
          }
          
          .timeline-marker {
            position: absolute;
            left: -30px;
            top: 0;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #6c757d;
          }
          
          .timeline-content {
            padding-top: 2px;
          }
          
          .input-group-text {
            background-color: #f8f9fa !important;
          }
          
          .form-control:focus {
            box-shadow: none;
            border-color: #667eea;
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
  };

  export default CitizenEscalatedComplaints;
